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
import { url, queryResource } from 'services/resource';


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
    selected: 0,
    activityIndex: 0,
    accordionIndex: ['0']
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
                activityIndex: 0,
                accordionIndex: ['0']
              },
            });
            dispatch({
              type: 'queryDetails',
              payload: {
                userid,
                courseid,
              },
            });
          } else {
            dispatch({
              type: 'updateDetails',
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
            activityIndex: data.activityIndex,
            selected: data.activityIndex > 0 ? 1 : 0,
            accordionIndex: [(data.activityIndex - 1).toString()]
          },
        });
      } else {
        Toast.fail(data.message || '获取失败');
      }
    },

    * updateDetails ({ payload }, { call, put }) {
      const data = yield call(queryLessonDetails, payload);
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            data: adapter(data),
            refreshing: false,
          },
        });
      } else {
        Toast.fail(data.message || '获取失败');
      }
    },

    * queryUrl ({ payload }, { call, put, select }) {
      const { dispatch = '', cmid = '', courseid = '', name = '', ...param } = payload,
        { success, message = '获取失败', data = [] } = yield call(url, {
          cmid,
          courseid,
          name,
          ...param
        }),
        targets = {};
      if (data.length) {
        if (success && dispatch) {
          const { id: urlId = '', content = [], cmid: ccmId = '', ...otherDatas } = data[0];
          handlerCourseClick({ content, ...otherDatas, id: ccmId }, courseid, dispatch);
        } else {
          Toast.fail(message);
        }
      }
    },
    * queryResource ({ payload }, { call, put, select }) {
      const { dispatch = '', cmid = '', courseid = '', instance = '', ...otherDatas } = payload,
        { success, message = '获取失败', data = [{}] } = yield call(queryResource, {
          cmid,
          courseid,
          resourceid: instance
        });
      if (success && dispatch) {
        yield handlerCourseClick({ ...otherDatas, contents: data, id: cmid }, courseid, dispatch);
      } else {
        Toast.fail(message);
      }
    },
  },
});
