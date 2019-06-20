import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { getLocalIcon } from 'utils';
import { model } from 'models/common';

const getDetail = (arr, id) => {
  return arr.find(item => item.id === id);
};

export default modelExtend(model, {
  namespace: 'medal',
  state: {
    detail: {},
  },
  subscriptions: {
    setupHistory ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        const { id } = query;
        if (pathname === '/medal') {
          if (action === 'PUSH') {
            dispatch({
              type: 'queryDetails',
              payload: {
                id,
              },
            });
          }
        }
      });
    },
  },
  effects: {
    * queryDetails ({ payload }, { call, put, select }) {
      const { data } = yield select(_ => _.medalList),
        { id } = payload;
      yield put({
        type: 'updateState',
        payload: {
          detail: getDetail(data, id * 1),
        },
      });
    },
  },

});
