import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';

import { routerRedux } from 'dva/router';
import { Toast } from 'components';

export default modelExtend(model, {
  namespace: 'opiniondetails',
  state: {},
  effects: {
    * queryDetails ({ payload }, { call, put, select }) {
      const { data } = yield select(_ => _.medal),
        { id } = payload;
      yield put({
        type: 'updateState',
        payload: {
          detail: getDetail(data, id * 1),
        },
      });
    },
  }
});
