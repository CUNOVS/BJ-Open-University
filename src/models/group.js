import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import * as queryList from 'services/list';

export default modelExtend(model, {
  namespace: 'group',
  state: {
    listData: [],
    refreshing: false,
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/group') {
          dispatch({
            type: 'query',
          });
        }
      });
    },
  },

  effects: {
    * query ({ payload }, { call, put, select }) {
      const { groups } = yield select(_ => _.app);
      yield put({
        type: 'updateState',
        payload: {
          listData: groups,
        },
      });
    },

  },
});
