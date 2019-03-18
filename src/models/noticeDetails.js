import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { getLocalIcon } from 'utils';
import { model } from 'models/common';

const data = [
  { state: '完成', achievement: '3', time: '2019年1月12日  17:00' },
  { state: '完成', achievement: '5', time: '2019年1月12日  18:00' },
];
const content = {
  title: 'Javascript设计模式解析',
  type: '考勤活动',
  week: '第一周测验',
  complete: '测验中',
  describe: '选择题共5道总分10分6分及以上及格',
  time: '2019年01月8日星期二10:18',
  achievement: '5/10'
};

export default modelExtend(model, {
  namespace: 'noticeDetails',
  state: {
  	data: [],
  	content: {}
  },
  subscriptions: {
    setupHistory ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/noticeDetails') {
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
        	data,
        	content
        },
      });  		
  	}
  },

});
