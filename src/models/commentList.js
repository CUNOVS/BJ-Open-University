import modelExtend from 'dva-model-extend';
import { model } from 'models/common';

const score = [
  { userIcon: '', userName: '缝小肛', rate: 1, createDate: '2018.10.26', content: '这课我学完涨了2倍工资，你们呢？' },
  { userIcon: '', userName: '老王', rate: 4, createDate: '2018.10.26', content: '陈独秀同学，李大钊已经转学了？' },
  { userIcon: '', userName: '人皇sky', rate: 3, createDate: '2018.10.26', content: '二营长把老子的意大利炮抗出来，不对是意大利面' },
]


export default modelExtend(model,{
    namespace:"commentList",
    state:{
    	banner:[]
    },
    subscriptions:{
        setup ({history,dispatch}){
            history.listen(({ pathname, action, query }) => {
                if(pathname === '/commentList'){
		          dispatch({
		            type: 'query',
		          });
                }
            });
        },
    },
    effects:{
	    * query ({ payload }, { call, put, select }) {
	      yield put({
	        type: 'updateState',
	        payload: {
	          banner:score,
	        }
	      });
	    },
    }
})