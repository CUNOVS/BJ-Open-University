import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { querySuperClass } from 'services/resource';
import { model } from 'models/common';
import { userTag } from 'utils/config';
import { _cg } from 'utils/cookie';

const { username, userid, userloginname } = userTag,
  findNameByCourses = (course = [], id) => {
    let name = '';
    if (id && course.length) {
      const selectedCourse = course.filter(c => c.id == id);
      name = selectedCourse.length ? (selectedCourse[0] || {}).fullname : '';
    }
    return name || '';
  };

export default modelExtend(model, {
  namespace: 'superclass',
  state: {
    data: () => ({}),
    isOpen: false,
    viewImages: [],
    viewImageIndex: -1,
    queryName: ''
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        let { pathname, query = {}, action } = location;
        if (pathname.startsWith('/superclass')) {
          if (action === 'PUSH') {
            dispatch({
              type: 'updateState',
              payload: {
                queryName: query.name || ''
              },
            });
            dispatch({
              type: 'query',
              payload: {
                ...query,
              },
            });
          }
        }
      });
    },
  },
  effects: {
    * query ({ payload }, { call, put, select }) {
      const { coureData = [] } = yield select(_ => _.app),
        { courseid = '', name = '' } = payload,
        coursename = yield findNameByCourses(coureData, courseid);

      const data = yield call(querySuperClass, {
        ...payload,
        coursename,
        ...{
          userid: _cg(userid),
          userfullname: _cg(username),
          username: _cg(userloginname)
        }
      });

      yield put({
        type: 'updateState',
        payload: {
          data: {
            ...data,
            name,
            cm: {
              course: courseid
            }
          }
        },
      });
    }
  }

});
