import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { queryOpeningLessons } from 'services/lesson';

const namespace = 'opening',
  adapter = (list) => {
    cnIsArray(list) && list.map((item, i) => {
      item.master = cnIsArray(item.master) && item.master[0] || { fullname: '未知', id: '' };
      item.lessonImage = cnIsArray(item.overviewfiles) && item.overviewfiles.length > 0 ? item.overviewfiles[0].fileurl : '';
    });
    return list;
  };
export default modelExtend(model, {
  namespace,
  state: {
    list: [],
    refreshing: false,
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, action }) => {
        if (pathname === `/${namespace}`) {
          dispatch({
            type: 'updateState',
            payload: {
              list: [],
              refreshing: false,
            },
          });
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
        data = yield call(queryOpeningLessons, { userid: userid, value: courseid });
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
