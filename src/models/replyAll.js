import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { getLocalIcon } from 'utils';
import { model } from 'models/common';

const data = [
  { content: '写的不错！！', stick: '置顶', title: '关于我！', number: '2', name: '柏拉图', time: '2018年9月18日     20:00', sun: '2', class: '北京历史文化-18春学前本2班' },
  { content: '写的不错！！', stick: '置顶', title: '关于我！', number: '2', name: '柏拉图', time: '2018年9月18日     20:00', sun: '2', class: '北京历史文化-18春学前本2班' },
  { content: '写的不错！！', stick: '置顶', title: '关于我！', number: '2', name: '柏拉图', time: '2018年9月18日     20:00', sun: '2', class: '北京历史文化-18春学前本2班' },
];

export default modelExtend(model, {
  namespace: 'replyAll',
  state: {
  	data: []
  },
  subscriptions: {
    setupHistory ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/replyAll') {
          dispatch({
            type: 'query',
          });
        }
      });
    },
  },
  effects: {
  	* query ({ playload }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: {
          data
        },
      });
  	}
  },

});
