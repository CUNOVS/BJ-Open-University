import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { getLocalIcon } from 'utils';
import { queryReview } from 'services/resource';
import { model } from 'models/common';


export default modelExtend(model, {
  namespace: 'quizReview',
  state: {
    data: {},
  },
  subscriptions: {
    setupHistory ({ dispatch, history }) {
      history.listen(({ pathname, query }) => {
        if (pathname === '/quizReview') {
          const { attemptid } = query;
          dispatch({
            type: 'queryReview',
            payload: {
              attemptid,
            },
          });
        }
      });
    },
  },
  effects: {
    * queryReview ({ payload }, { call, put, select }) {
      const data = yield call(queryReview, payload);
      if (data.success) {
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
