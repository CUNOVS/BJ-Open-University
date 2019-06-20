import modelExtend from 'dva-model-extend';
import { model } from 'models/common';
import { queryForum, addNewForum } from 'services/forum';

const getDefaultPaginations = () => ({
    current: 1,
    total: 0,
    size: 10,
  }),
  namespace = 'forum';

export default modelExtend(model, {
  namespace,
  state: {
    data: {},
    scrollerTop: 0,
    paginations: getDefaultPaginations(),
    refreshId: '',
  },
  subscriptions: {
    setup ({ history, dispatch }) {
      history.listen(({ pathname, action, query }) => {
        if (pathname === '/forum') {
          dispatch({
            type: 'updateState',
            payload: {
              data: {},
              scrollerTop: 0,
              paginations: getDefaultPaginations(),
              refreshId: '',
            },
          });
          const { cmid, courseid, forumid } = query;
          dispatch({
            type: 'queryList',
            payload: {
              courseid,
              forumid,
              cmid,
            },
          });
        }
      });
    },
  },
  effects: {
    * queryList ({ payload }, { call, put, select }) {
      const { callback = '', isRefresh = false } = payload,
        _this = yield select(_ => _[`${namespace}`]),
        { paginations: { current, total, size }, lists, id } = _this,
        start = isRefresh ? 1 : current,
        result = yield call(queryForum, { ...payload });
      if (result) {
        yield put({
          type: 'updateState',
          payload: {
            data: result,
          },
        });
      }
      // if (result) {
      //   let { data = [], totalCount = 0 } = result,
      //     newLists = {};
      //   newLists = start === 1 ? data : [...lists, ...data];
      //   yield put({
      //     type: 'updateState',
      //     payload: {
      //       paginations: {
      //         ..._this.paginations,
      //         total: totalCount * 1,
      //         current: start + 1,
      //       },
      //       data: newLists,
      //     },
      //   });
      // }
      if (callback) {
        callback();
      }
    },
  },
});
