import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';

import { routerRedux } from 'dva/router';
import { Toast } from 'components';

export default modelExtend(model, {
  namespace: 'reply',
  state: {},
  effects: {
    * sendOpinion ({ payload }, { call, put, select }) {

    },
    * sendPatryOpinion ({ payload }, { call, put, select }) {

    },
  }
});
