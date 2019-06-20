import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { queryUserInfo } from 'services/app';

export default modelExtend(model, {
  namespace: 'userpage',
  state: {
    data: {},
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        let { pathname, action, query } = location;
        const { userid } = query;
        if (pathname.startsWith('/userpage')) {
          dispatch({
            type: 'query',
            payload: {
              userid,
            },
          });
        }
      });
    },
  },
  effects: {
    * query ({ payload }, { call, put, select }) {
      const data = yield call(queryUserInfo, payload);
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            data,
          },
        });
      }
    },
  },

});

