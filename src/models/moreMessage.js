import modelExtend from 'dva-model-extend';
import { model } from 'models/common';

const bannerNotice = [
  '新人注册专享35sdfgsdsd第三个发送到该发生地方噶水电费感受到发给元大礼包，你来我就送',
  '通大量精选课程限时免费学习'
];

export default modelExtend(model, {
  namespace: 'moreMessage',
  state: {
    banner: []
  },
  subscriptions: {
    setup ({ history, dispatch }) {
      history.listen(({ pathname, action, query }) => {
        if (pathname === '/moreMessage') {
		          dispatch({
		            type: 'query',
		          });					
        }
      });
    },
  },
  effects: {
	    * query ({ payload }, { call, put, select }) {
	    	yield put({
	    		type: 'updateState',
	    		payload: {
	    			banner: bannerNotice
	    		}
	    	});
	    },
  }
});

