import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { queryClosedLessons } from 'services/lesson';

const adapter = (list) => {
  cnIsArray(list) && list.map((item, i) => {
    item.master = cnIsArray(item.master) && item.master[0] || { fullname: '未知', id: '' };
    item.lessonImage = cnIsArray(item.overviewfiles) && item.overviewfiles.length > 0 ? item.overviewfiles[0].fileurl : '';
  });
  return list;
};

export default modelExtend(model, {
  namespace: 'closed',
  state: {
    list: [],
    refreshing: false,
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/closed') {
          dispatch({
            type: 'queryList',
          });
        }
      });
    },
  },

  effects: {
    * queryList ({ payload }, { call, put, select }) {
      const { users: { userid }, courseid } = yield select(_ => _.app),
        data = yield call(queryClosedLessons, { userid: userid, value: courseid });
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            list: adapter(data.data),
            refreshing: false,
          },
        });
      }
    },

  },
});
