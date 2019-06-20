import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { config, cookie } from 'utils';
import { model } from 'models/common';
import { Toast } from 'components';
import { queryCurrentTask, queryAllTask } from 'services/task';
import * as query from 'services/message';

const { userTag: { userid, usertoken } } = config,
  { _cg } = cookie,
  adapter = (list) => {
    cnIsArray(list) && list.map((item, i) => {
      item.master = cnIsArray(item.master) && item.master[0] || { fullname: '未知', id: '' };
      item.lessonImage = cnIsArray(item.overviewfiles) && item.overviewfiles.length > 0 ? item.overviewfiles[0].fileurl : '';
    });
    return list;
  };
export default modelExtend(model, {
  namespace: 'dashboard',
  state: {
    count: '',
    taskList: [],
    taskAllList: [],
    refreshing: false,
    selectIndex: 0,
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, action }) => {
        if (pathname === '/dashboard' || pathname === '/') {
          dispatch({
            type: 'queryCount',
          });
          dispatch({
            type: 'query',
          });
        }
      });
    },
  },
  effects: {
    * query ({ payload }, { call, put }) {
      if (_cg(usertoken) !== '') {
        const data = yield call(queryCurrentTask, { userid: _cg(userid) });
        if (data) {
          yield put({
            type: 'updateState',
            payload: {
              taskList: data.data,
              refreshing: false,
            },
          });
        }
      }
    },
    * queryAllTask ({ payload }, { call, put }) {
      const data = yield call(queryAllTask, { userid: _cg(userid) });
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            taskAllList: adapter(data.data),
            refreshing: false,
          },
        });
      }
    },
    * queryCount ({ payload }, { call, put, select }) {
      const { success, message = '获取失败', messageCount } = yield call(query.queryMessageCount, { userid: _cg(userid) });
      if (success) {
        yield put({
          type: 'updateState',
          payload: {
            count: messageCount,
          },
        });
      } else {
        Toast.fail(message);
      }
    },
  },
});
