import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';

const defaultData = [
  {
    image: require('../themes/images/facechat/01.jpg'),
    title: '摄影爱好者',
    founder: '王刚',
    people: '2490',

  },
  {
    image: require('../themes/images/special/s02.jpg'),
    title: '我们爱学核物理',
    founder: '李志',
    people: '5125',

  },
  {
    image: require('../themes/images/facechat/03.jpg'),
    title: '一起学日语',
    founder: '青山七惠',
    people: '1230',
  },
  {
    image: require('../themes/images/facechat/04.jpg'),
    title: '退休后的广场舞',
    founder: '刘姥姥',
    people: '254',

  },
];
export default modelExtend(model, {
  namespace: 'facechat',
  state: {
    dataList: [],
  },
  subscriptions: {
    setup ({ history, dispatch }) {
      history.listen(({ pathname, action, query }) => {
        if (pathname === '/facechat') {
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
          dataList: defaultData,
        },
      });
    },

  },
});
