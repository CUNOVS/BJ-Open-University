import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';



export default modelExtend(model, {
  namespace: 'achievement',
  state: {
    listData: [],
    gridDatas: []
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/achievement') {
          dispatch({
            type: 'query',
          });
        }
      });
    },
  },

  effects: {
    * query ({ payload }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: {
          gridDatas: [],
          listData: []
        },
      });
    },

  },
});
