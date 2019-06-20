import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { Toast } from 'components';
import { queryPage } from 'services/resource';

const getViewIamges = (text) => {
  const result = [];
  if (text) {
    const imgReg = /<img.*?(?:>|\/>)/gi,
      srcReg = /src=[\'\"]?([^\'\"]*)[\'\"]?/i,
      images = text.match(imgReg);
    images && images.map(image => {
      let imageSrc = image.match(srcReg);
      if (imageSrc && imageSrc[1]) {
        result.push(imageSrc[1].replace(':80/', '/'));
      }
    });
  }
  return result;
};

export default modelExtend(model, {
  namespace: 'page',
  state: {
    data: {},
    isOpen: false,
    viewImages: [],
    viewImageIndex: -1,
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(location => {
        let { pathname, query, action } = location;
        if (pathname.startsWith('/page')) {
          if (action === 'PUSH') {
            dispatch({
              type: 'updateState',
              payload: {
                isOpen: false,
                viewImages: [],
                viewImageIndex: -1,
                data: {},
              },
            });
            dispatch({
              type: 'query',
              payload: {
                ...query,
              },
            });
          }
        }
      });
    },
  },
  effects: {
    * query ({ payload }, { call, put, select }) {
      const data = yield call(queryPage, { ...payload }),
        { content = '' } = data,
        viewImages = getViewIamges(content);
      yield put({
        type: 'updateState',
        payload: {
          data,
          viewImages,
        },
      });
    },
  },
});
