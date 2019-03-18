import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';

export default modelExtend(model, {
  namespace: 'conversation',
  state: {
    content: ''
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        let { pathname, query, action } = location;
        if (pathname.startsWith('/conversation')) {
          if (action === 'PUSH') {
            dispatch({
              type: 'query',
            });
          }
        }
      });
    },
  },
  effects: {
    * query ({ payload }, { call, put, select }) {

    },
  }

});
