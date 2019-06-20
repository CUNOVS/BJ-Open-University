import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import * as query from 'services/message';

export default modelExtend(model, {
  namespace: 'messageCenter',
  state: {
    count: {},
    talkList: [],
    messageList: [],
    selectIndex: 0,
    nowPage: 1,
    readstart: 0,
    unreadstart: 0,
  },
  subscriptions: {
    setupHistory ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/messageCenter') {
          dispatch({
            type: 'queryCount',
          });
          dispatch({
            type: 'queryMessage',
          });
        }
      });
    }
    ,
  },
  effects: {
    * queryCount ({ payload }, { call, put, select }) {
      const { users: { userid } } = yield select(_ => _.app),
        data = yield call(query.queryMessageCount, { userid });
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            count: data,
          },
        });
      }
    },
    * queryMessage ({ payload }, { call, put, select }) {
      const { users: { userid } } = yield select(_ => _.app),
        { nowPage } = yield select(_ => _.messageCenter),
        data = yield call(query.queryMessage, { userid, nowPage });
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            messageList: data.readData,
          },
        });
      }
    },
    * queryTalkMessage ({ payload }, { call, put, select }) {
      const { users: { userid } } = yield select(_ => _.app),
        { readstart, unreadstart } = yield select(_ => _.messageCenter),
        data = yield call(query.queryTalkMessage, { userid, readstart, unreadstart });
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            talkList: data.listData,
          },
        });
      }
    },
  },

});
