import modelExtend from 'dva-model-extend';
import { model } from 'models/common';

export default modelExtend(model, {
  namespace: 'forumDetails',
  state: {
  },
  subscriptions: {
    setup ({ history, dispatch }) {
      history.listen(({ pathname, action, query }) => {
        if (pathname === '/forumDetails') {
			
        }
      });
    },
  },
  effects: {

  }
});
