import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { getLocalIcon } from 'utils';
import { model } from 'models/common';
import { queryHomework, queryHomeWorkComments } from 'services/resource';

export default modelExtend(model, {
  namespace: 'homework',
  state: {
    data: [],
    comments: [],
  },
  subscriptions: {
    setupHistory ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        const { cmid, ssignId, courseid } = query;
        if (pathname === '/homework') {
          dispatch({
            type: 'queryHomework',
            payload: {
              cmid,
              ssignId,
              courseid,
            },
          });
        }
      });
    },
  },
  effects: {
    * queryHomework ({ payload }, { call, put, select }) {
      const { cmid } = payload;
      const { users: { userid } } = yield select(_ => _.app),
        data = yield call(queryHomework, {
          ...payload,
          userid,
        });
      yield put({
        type: 'updateState',
        payload: {
          data,
        },
      });
      if (data) {
        yield put({
          type: 'queryComments',
          payload: {
            cmid: data.cmid,
            userid,
            itemid: data.itemid,
          },
        });
      }
    },
    * queryComments ({ payload }, { call, put, select }) {
      const { users: { userid } } = yield select(_ => _.app),
        comment = yield call(queryHomeWorkComments, payload);
      console.log(comment);
    },
  },

});
