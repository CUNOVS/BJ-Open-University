import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { routerRedux } from 'dva/router';
import { Toast } from 'components';

const getDetail = (arr, id) => {
  if (cnIsArray(arr) && arr.length > 0) {
    return arr.find(item => item.opinionId === id);
  }
  return {};
};
export default modelExtend(model, {
  namespace: 'opiniondetails',
  state: {
    detail: {},
    id: ''
  },
  subscriptions: {
    setupHistory ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        const { id } = query;
        dispatch({
          type: 'updateState',
          payload: {
            id
          }
        });
        if (pathname === '/opiniondetails') {
          dispatch({
            type: 'updateState',
            payload: {
              detail: {},
            }
          });
          dispatch({
            type: 'queryDetails',
            payload: {
              id
            }
          });
        }
      });
    },
  },
  effects: {
    * queryDetails ({ payload }, { call, put, select }) {
      const { list = [] } = yield select(_ => _.myopinion),
        { id } = payload;
      yield put({
        type: 'updateState',
        payload: {
          detail: getDetail(list, id),
        },
      });
    },
  }
});
