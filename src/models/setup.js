import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { config, cookie } from 'utils';
import { setAvatar } from 'services/setup';
import { Toast } from 'antd-mobile';

const MD5 = require('md5'),
  encrypt = (word) => {
    return MD5(word, 'hex');
  },
  { _cs } = cookie,
  { userTag: { username, useravatar } } = config;

export default modelExtend(model, {
  namespace: 'setup',
  state: {

  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen((location) => {
        let { pathname, query } = location;
        if (pathname.startsWith('/setup')) {

        }
      });
    },
  },
  effects: {
    * setAvatar ({ payload }, { call, put }) {
      const data = yield call(setAvatar, payload);
      if (data.success) {
        _cs(useravatar, data.profileimageurl);
        yield put({
          type: 'app/updateUsers',
          payload: {
            users: {
              useravatar: data.profileimageurl,
            },
          },
        });
        Toast.success('修改成功');
      } else {
        Toast.fail('修改失败');
      }
    },
  },

});
