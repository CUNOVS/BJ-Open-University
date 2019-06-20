import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { queryUserInfo } from 'services/app';

export default modelExtend(model, {
  namespace: 'homepage',
  state: {
    data: {},
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        let { pathname, action } = location;
        if (pathname.startsWith('/homepage')) {
          if (action === 'PUSH') {
            dispatch({
              type: 'updateState',
              payload: {
                data: {},
              }
            });
            dispatch({
              type: 'query',
            });
          }
        }
      });
    },
  },
  effects: {
    * query ({ payload }, { call, put, select }) {
      const { users: { userid } } = yield select(_ => _.app),
        data = yield call(queryUserInfo, { userid });
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            data
          }
        });
      }
    },
  },

});
