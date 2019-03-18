import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { getLocalIcon } from 'utils';
import { model } from 'models/common';

const data = {
  image: require('../themes/images/WKC/t.png'),
  name: '学习能手',
  describe: '恭喜你荣升学习能手',
  class: '高等数学',
  effective: '2019年11月12日',
  invalid: '2019年11月28日'
};

export default modelExtend(model, {
  namespace: 'medal',
  state: {
  	data: {}
  },
  subscriptions: {
    setupHistory ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/medal') {
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
    }
  },

});
