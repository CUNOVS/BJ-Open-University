import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';

const bannerNotice = [
  '新人注册专享35sdfgsdsd第三个发送到该发生地方噶水电费感受到发给元大礼包，你来我就送',
  '通大量精选课程限时免费学习',
];
export default modelExtend(model, {
  namespace: 'dashboard',
  state: {
    bannerNotice: [],
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/dashboard' || pathname === '/') {
          dispatch({
            type: 'query',
          });
        }
      });
    },
  },
  effects: {
    * query ({ payload }, { call, put }) {
      yield put({
        type: 'updateState',
        payload: {
          bannerNotice: bannerNotice,
        },
      });
    },
  },
});
