import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { getLocalIcon } from 'utils';
import { model } from 'models/common';

const data = [
  { image: require('../themes/images/WKC/t.png'), title: '学习能手', time: '2019年11月2日	17:00' },
];

export default modelExtend(model, {
  namespace: 'medalList',
  state: {
    data: []
  },
  subscriptions: {
    setupHistory ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/medalList') {
          dispatch({
            type: 'queryMessage',
          });
        }
      });
    },
  },
  effects: {
    * queryMessage ({ payload }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: {
          data
        },
      });
    },		
  },

});
