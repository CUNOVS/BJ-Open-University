import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { getLocalIcon } from 'utils';
import { model } from 'models/common';

export default modelExtend(model, {
  namespace: 'messageCenter',
  state: {},
  subscriptions: {
    setupHistory ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/messageCenter') {

        }
      });
    }
    ,
  },
  effects: {
  },

});
