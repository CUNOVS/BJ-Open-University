import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';

import { routerRedux } from 'dva/router';
import { Toast } from 'components';

const defaultNote = [
  {
    title: 'Jquery基础',
    lesson: '第一章 1-1',
    createDate: '2018.7.22',
    contents: 'jQuery选择器',
  },
  {
    title: 'Jquery基础2',
    lesson: '第一章 1-1',
    createDate: '2018.7.22',
    contents: 'jQuery选择器',
  },
];

export default modelExtend(model, {
  namespace: 'notelist',
  state: {
    noteDate: [],
  },
  subscriptions: {
    setup ({ history, dispatch }) {
      history.listen(({ pathname, action, query }) => {
        if (pathname === '/notelist') {
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
          noteDate: defaultNote,
        },
      });
    },
    * sendPatryOpinion ({ payload }, { call, put, select }) {

    },
  },
});
