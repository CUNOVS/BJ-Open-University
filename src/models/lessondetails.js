/**
 * @author Lowkey
 * @date 2019/03/15 15:07:41
 * @Description:
 */

import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { queryLessonDetails } from 'services/lesson';


/**
 * 获取section
 * @param arr
 */
const getLessonList = (arr) => {
  return arr.slice(1);
};

/**
 * @param data
 * 修改返回值
 */
const adapter = (data) => {
  data.master = cnIsArray(data.master) && data.master[0] || { fullname: '未知', id: '' };
  data.tutor = cnIsArray(data.tutor) && data.tutor[0] || { fullname: '未知', id: '' };
  data.lessonImage = cnIsArray(data.overviewfiles) && data.overviewfiles.length > 0 ? data.overviewfiles[0].fileurl : '';
  data.guide = data.contents[0].modules;
  data.resources = getLessonList(data.contents);
  return data;
};

export default modelExtend(model, {
  namespace: 'lessondetails',
  state: {
    data: {},
    refreshing: false,
    selectIndex: 0,
  },
  subscriptions: {
    setup ({ history, dispatch }) {
      history.listen(({ pathname, action, query }) => {
        const { userid, courseid } = query;
        if (pathname === '/lessondetails') {
          if (action === 'PUSH') {
            dispatch({
              type: 'updateState',
              payload: {
                data: [],
                selectIndex: 0,
                refreshing: false,
              },
            });
          }
          dispatch({
            type: 'queryDetails',
            payload: {
              userid,
              courseid,
            },
          });
        }
      });
    },
  },
  effects: {
    * queryDetails ({ payload }, { call, put }) {
      const data = yield call(queryLessonDetails, payload);
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            data: adapter(data),
            refreshing: false,
          },
        });
        yield put({
          type: 'updateState',
          payload: {
            selectIndex: data.activityIndex > 0 ? 1 : 0,
          },
        });
      }
    },
  },


});
