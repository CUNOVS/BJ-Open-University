import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import * as queryList from 'services/list';
import { model } from 'models/common';

const getTeachers = (arr) => {
  return arr.filter(item => item.hasOwnProperty('mentors'));
};

export default modelExtend(model, {
  namespace: 'teachers',
  state: {
    listData: [],
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/teachers') {
          if (action === 'PUSH') {
            dispatch({
              type: 'query',
            });
          }

        }
      });
    },
  },

  effects: {
    * query ({}, { call, put, select }) {
      const { coureData } = yield select(_ => _.app),
        response = yield call(queryList.queryTeachers, { coureData: JSON.stringify(coureData) });
      if (response.success) {
        yield put({
          type: 'updateState',
          payload: {
            listData: getTeachers(response.mentors),
          },
        });
      }
    },

  },
});
