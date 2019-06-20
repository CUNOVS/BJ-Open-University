/**
 * @author Lowkey
 * @date 2019/03/15 15:07:41
 * @Description:
 */

import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { Toast } from 'components';
import { handlerCourseClick } from 'utils/commonevents';
import { queryLessonDetails } from 'services/lesson';
import { url } from 'services/resource';


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
  data.guide = data.contents[0].modules;
  data.section0Summary = data.contents[0].summary;
  data.resources = getLessonList(data.contents);
  return data;
};

export default modelExtend(model, {
  namespace: 'lessondetails',
  state: {
    data: {},
    refreshing: false,
    selectIndex: 0,
    activityIndex: 0

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
            dispatch({
              type: 'queryDetails',
              payload: {
                userid,
                courseid,
              },
            });
          }
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
            activityIndex: data.activityIndex
          },
        });
      } else {
        Toast.fail(data.message || '获取失败');
      }
    },

    * queryUrl ({ payload }, { call, put, select }) {
      const { dispatch = '', cmid = '', courseid = '', name = '', ...param } = payload,
        { success, message = '获取失败', data = [{}] } = yield call(url, {
          cmid,
          courseid,
          name,
          ...param
        }),
        targets = {};
      if (success && dispatch) {
        const { id: urlId = '', content = [], cmid: ccmId = '', ...otherDatas } = data[0];
        handlerCourseClick({ content, ...otherDatas, id: ccmId }, courseid, dispatch);
      } else {
        Toast.fail(message);
      }
    },
  },
});
