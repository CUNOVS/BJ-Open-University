import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { queryConversation } from 'services/message';
import { model } from 'models/common';

export default modelExtend(model, {
  namespace: 'conversation',
  state: {
    content: '',
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        let { pathname, query, action } = location;
        const { useridfrom, name } = query;
        if (pathname.startsWith('/conversation')) {
          dispatch({
            type: 'query',
            payload: {
              useridfrom,
              name,
            },
          });
        }
      });
    },
  },
  effects: {
    * query ({ payload }, { call, put, select }) {
      const { users: { userid } } = yield select(_ => _.app);
      const response = yield call(queryConversation, { useridfrom: payload.useridfrom, userid, nowPage: 1 });
      console.log(response);
    },
  },

});
