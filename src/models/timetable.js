import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';

const namespace = 'timetable';
const banner = [
	{
		title:'JQuery基础课程',
		num:'5',
		tims:'1小时10分钟',
		datas:'2018-10-24至2018-10-27',
		averageTime:'0节 0分钟'
	}
]
export default modelExtend(model, {
  namespace,
  state: {
  	banner:[]
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, action, query }) => {
        if (pathname === `/${namespace}`) {
          if (action === 'PUSH') {
            dispatch({
              type: 'queryListview',
            });
          }
        }
      });
    },
  },
  effects: {
    * queryListview ({ payload }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: {
          banner:banner
        }
      });
    },
  },
});
