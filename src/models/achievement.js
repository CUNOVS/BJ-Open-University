import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import * as queryList from 'services/list';
import { model } from 'models/common';


export default modelExtend(model, {
  namespace: 'achievement',
  state: {
    listData: [],
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/achievement') {
          if (action === 'PUSH') {
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
      const { users: { userid }, courseid } = yield select(_ => _.app)
        // response = yield call(queryList.queryGrade, { userid, courseid });
      yield put({
        type: 'updateState',
        payload: {
          listData: [],
        },
      });
    },

  },
});
