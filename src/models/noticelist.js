import modelExtend from 'dva-model-extend';
import { model } from 'models/common';

const data = [
  { title: '课程更新', content: 'Web前端开发之JavaScript精英课堂【渡一教育】', date: '2018年11月14日' },
  { title: '同学们有新课上线了', content: 'Web前端开发之JavaScript精英课堂【渡一教育】', date: '2018年11月14日' },
];

export default modelExtend(model, {
  namespace: 'noticelist',
  state: {
    data: [],
  },
  subscriptions: {
    setup ({ history, dispatch }) {
      history.listen(({ pathname, action, query }) => {
        if (pathname === '/noticelist') {
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
          data: data,
        },
      });
    },
  },
});

