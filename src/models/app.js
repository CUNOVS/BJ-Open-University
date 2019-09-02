import { routerRedux } from 'dva/router';
import { hashHistory } from 'react-router';
import { Toast } from 'components';
import { config, cookie, setLoginOut } from 'utils';
import { defaultTabBars } from 'utils/defaults';
import { queryBaseInfo, logout, accessTime, logApi, getVersion } from 'services/app';

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
  },

  getContats = (obj = {}) => [...obj.online, ...obj.offline],
  removeLocalFile = (file) => new Promise(resolve => {
    const onSuccess = (res) => resolve({ success: true, response: res }),
      onError = (err) => resolve({ success: false, response: err });
    cnRemoveLocalFile(file.localURL, onSuccess, onError);
  });
;


export default {
  namespace: 'app',
  state: {
    spinning: false,
    isLogin: getUserLoginStatus(),
    users: getInfoUser(),
    courseid: '',
    coureData: [],
    updates: {},
    groups: [],
    contacts: [],
    showBackModal: false,
    downloadProgress: 0
  },
  subscriptions: {
    setupHistory ({ dispatch, history }) {
      history.listen(({ pathname }) => {
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
          dispatch({
            type: 'getVersion',
            payload: {
              currentVersion: cnVersion,
              systemType: cnDeviceType(),
            }
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
          // eslint-disable-next-line no-prototype-builtins
          cnExecFunction(data.hasOwnProperty('_configFunction') ? data._configFunction : '');
          yield put({
            type: 'updateState',
            payload: {
              courseid: getCourse(data.courses),
              coureData: data.courses,
              groups: getGroups(data.groups, data.courses),
              contacts: getContats(data.contacts),
            },
          });
          yield put({
            type: 'userpage/updateState',
            payload: {
              contacts: getContats(data.contacts)
            },
          });
        } else {
          Toast.fail(data.message);
          yield put(routerRedux.push({
            pathname: '/login',
          }));
        }
      }
    },

    * getVersion ({ payload }, { call, put, select }) {
      const data = yield call(getVersion, payload);
      const { updates = {} } = data,
        { urls } = updates;
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            updates: data,
          },
        });
        if (urls !== '') {
          yield put({
            type: 'updateState',
            payload: {
              showModal: true,
            },
          });
        }
      } else {
        Toast.fail(data.message);
        yield put(routerRedux.push({
          pathname: '/login',
        }));
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

    * accessTime ({ payload }, { call }) {
      yield call(accessTime, { ...payload, userid: _cg(userid) });
    },


    * logApi ({ payload }, { call }) {
      yield call(logApi, { ...payload, userid: _cg(userid) });
    },

    * removeAllLocalFiles ({ cb }, { call }) {
      const files = yield cnGetAllLocalFiles(),
        targetFiles = [];
      for (let i = 0; i < files.length; i++) {
        const file = files[i],
          result = yield call(removeLocalFile, file);
        if (!result.success) {
          targetFiles.push(file);
        }
      }
      yield cnSetAllLocalFiles(targetFiles);
      yield cb && cb();
    }
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

    updateBackModal (state, { payload }) {
      return {
        ...state,
        showBackModal: payload.showBackModal
      };
    }

  }
  ,
};
