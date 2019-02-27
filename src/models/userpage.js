import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';

export default modelExtend(model, {
  namespace: 'userpage',
  state: {
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        let { pathname, action } = location;
        if (pathname.startsWith('/userpage')) {

        }
      });
    },
  },
  effects: {
  }

});

