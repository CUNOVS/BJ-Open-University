import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { Toast } from 'components';
import { config, cookie } from 'utils';
import { queryUserInfo, AddContact, DeleteContact } from 'services/app';

const { userTag: { usertoken, userid } } = config,
  { _cg } = cookie,
  others = {};
others[userid] = _cg(userid);
others[usertoken] = _cg(usertoken);

export default modelExtend(model, {
  namespace: 'userpage',
  state: {
    data: {},
    contacts: [],
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        let { pathname, query } = location;
        if (pathname.startsWith('/userpage')) {
          dispatch({
            type: 'query',
            payload: {
              userid: query.userid,
            },
          });
        }
      });
    },
  },
  effects: {
    * query ({ payload }, { call, put, select }) {
      const { contacts } = yield select(_ => _.app);
      const data = yield call(queryUserInfo, payload);
      if (data) {
        yield put({
          type: 'updateState',
          payload: {
            data,
            contacts,
          },
        });
      }
    },
    * addContact ({ payload }, { call, put }) {
      const { success, message = '操作失败' } = yield call(AddContact, payload);
      if (success) {
        Toast.success('成功添加联系人');
        yield put({
          type: 'app/query',
          payload: {
            ...others,
          },
        });
      } else {
        Toast.fail(message);
      }
    },
    * deleteContact ({ payload }, { call, put }) {
      const { success, data, message = '操作失败' } = yield call(DeleteContact, payload);
      if (success) {
        Toast.success('已移除联系人');
        yield put({
          type: 'app/query',
          payload: {
            ...others,
          },
        });
      } else {
        Toast.fail(message);
      }
    },
  },

});

