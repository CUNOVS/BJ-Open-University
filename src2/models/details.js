import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';

import { routerRedux } from 'dva/router';
import { Toast } from 'components';

export default modelExtend(model, {
  namespace: 'details',
  state: {},
  effects: {}
});
