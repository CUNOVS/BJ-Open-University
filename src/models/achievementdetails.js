import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import * as queryList from 'services/list';
import { model } from 'models/common';

const getGradeItems = (arr = []) => {
  return arr.filter(item => item.itemType !== 'course');
};

export default modelExtend(model, {
  namespace: 'achievementdetails',
  state: {
    gradeItems: [],
    refreshing: false,
    scrollerTop: 0
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/achievementdetails') {
          const { courseid } = query;
          if (action === 'PUSH') {
            dispatch({
              type: 'updateState',
              payload: {
                gradeItems: [],
                refreshing: false,
                scrollerTop: 0
              }
            });
            dispatch({
              type: 'query',
              payload: {
                courseid,
              },
            });
          }
        }
      });
    },
  },

  effects: {
    * query ({ payload }, { call, put, select }) {
      const { users: { userid } } = yield select(_ => _.app),
        response = yield call(queryList.queryGradeDetails, { userid, ...payload });
      if (response.success) {
        const { coursegrade, coursename, courseid, data } = response;
        yield put({
          type: 'updateState',
          payload: {
            coursegrade,
            coursename,
            courseid,
            gradeItems: getGradeItems(data)
          },
        });
      }
    },

  },
});
