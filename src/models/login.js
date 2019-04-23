import { routerRedux } from 'dva/router';
import { login } from 'services/login';
import { Toast } from 'antd-mobile';
import modelExtend from 'dva-model-extend';
import { pageModel } from './common';
import { setLoginIn } from 'utils';

export default modelExtend(pageModel, {
  namespace: 'login',

  state: {
    state: true,
    loadPwd: '',
    buttonState: true, // 登录按钮状态
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
      });
    },
  },
  effects: {
    * login ({ payload }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: {
          buttonState: false,
        },
      });
      const { from = '/', password = '' } = payload;
      const data = yield call(login, payload, true);
      yield put({
        type: 'updateState',
        payload: {
          buttonState: true,
        },
      });
      if (data && data.success) {
        if (data.error) {
          Toast.offline(data.error);
        } else {
          const { fullname = '', userid = '', token = '', userpictureurl = '' } = data,
            users = {
              user_name: fullname,
              user_pwd: password,
              user_token: token,
              user_id: userid,
              user_avatar: userpictureurl,
            };
          setLoginIn(users);
          yield put({
            type: 'app/updateUsers',
            payload: {},
          });
          yield put(routerRedux.replace({
            pathname: from,
          }));
        }
      }
    },
  },
});
