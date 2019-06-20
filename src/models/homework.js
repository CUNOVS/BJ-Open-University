import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { getLocalIcon } from 'utils';
import { model } from 'models/common';
import { Toast } from 'components';
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
        const { cmid, assignId, courseid } = query;
        if (pathname === '/homework') {
          if (action === 'PUSH') {
            dispatch({
              type: 'updateState',
              payload: {
                data: [],
                comments: [],
              }
            });
            dispatch({
              type: 'queryHomework',
              payload: {
                cmid,
                ssignId: assignId,
                courseid,
              },
            });
          }
        }
      });
    },
  },
  effects: {
    * queryHomework ({ payload }, { call, put, select }) {
      const { users: { userid } } = yield select(_ => _.app),
        data = yield call(queryHomework, {
          ...payload,
          userid,
        });
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            data,
          },
        });
        if (data.itemid) {
          yield put({
            type: 'queryComments',
            payload: {
              cmid: data.cmid,
              userid,
              itemid: data.itemid,
            },
          });
        }
      } else {
        Toast.fail('获取信息失败');
      }
    },
    * queryComments ({ payload }, { call, put, select }) {
      const { comments, success, message = '请稍后再试' } = yield call(queryHomeWorkComments, payload);
      if (success) {
        yield put({
          type: 'updateState',
          payload: {
            comments,
          },
        });
      } else {
        Toast.fail(message);
      }
    },
  },

});
