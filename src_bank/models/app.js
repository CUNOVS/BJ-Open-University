import { routerRedux } from 'dva/router';
import { hashHistory } from 'react-router';
import { config, cookie, setLoginOut } from 'utils';
import { defaultTabBarIcon, defaultTabBars } from 'utils/defaults';
import { queryBaseInfo, logout } from 'services/app';


const { userTag: { username, usertoken, userid, useravatar } } = config,
  { _cg } = cookie,
  getInfoUser = () => {
    const result = {};
    result[username] = _cg(username);
    result[usertoken] = _cg(usertoken);
    result[userid] = _cg(userid);
    result[useravatar] = _cg(useravatar);
    return result;
  },
  getUserLoginStatus = (users = '') => {
    users = users || getInfoUser();
    return users[userid] !== '' && users[usertoken] !== '' && users[username] !== '';
  },

  getCourse = (arr) => {
    let res = [];
    arr && arr.map(item => (
      res.push(item.id)
    ));
    return res.join(',');
  },
  getGroups = (arr = [], course) => {
    let obj = {};
    arr.map((item, i) => {
      obj = course.find(data => {
        return data.id === item.courseid;
      });
      item.course = obj.fullname;
    });
    return arr;
  };

export default {
  namespace: 'app',
  state: {
    spinning: false,
    isLogin: getUserLoginStatus(),
    users: getInfoUser(),
    courseid: '',
    coureData: [],
    groups: [],
  },
  subscriptions: {
    setupHistory ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/') {
          const others = {};
          others[userid] = _cg(userid);
          others[usertoken] = _cg(usertoken);
          dispatch({
            type: 'query',
            payload: {
              ...others,
            },
          });
          dispatch({
            type: 'updateUsers',
          });
        }
      });
    },
  },
  effects: {
    * query ({ payload }, { call, put }) {
      if (_cg(usertoken) === '') {
        yield put(routerRedux.push({
          pathname: '/login',
        }));
      } else {
        const data = yield call(queryBaseInfo, payload);
        if (data.success) {
          yield put({
            type: 'updateState',
            payload: {
              courseid: getCourse(data.courses),
              coureData: data.courses,
              groups: getGroups(data.groups, data.courses),
            },
          });
        }
      }
    },

    * logout ({}, { call, put, select }) {
      const data = yield call(logout);
      if (data) {
        setLoginOut();
        yield put({
          type: 'updateState',
          payload: {
            users: {},
            isLogin: false,
          },
        });
        yield put(routerRedux.replace({
          pathname: '/login',
        }));
      }
    },


  },
  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      };
    },
    updateUsers (state, { payload = {} }) {
      let { users: appendUsers = getInfoUser(), others = {} } = payload,
        { users } = state;
      users = { ...users, ...appendUsers };
      let isLogin = getUserLoginStatus(users);
      return {
        ...state,
        ...others,
        users,
        isLogin,
      };
    },

  }
  ,
};
