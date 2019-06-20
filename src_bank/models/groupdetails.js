import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { queryMembers } from 'services/list';
import { model } from 'models/common';

const getDefaultPaginations = () => ({
    nowPage: 1,
    total: 0,
    rowCount: 20,
  }),
  namespace = 'groupdetails';

export default modelExtend(model, {
  namespace,
  state: {
    listData: [],
    scrollerTop: 0,
    paginations: getDefaultPaginations(),
    refreshId: '',
  },
  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/groupdetails') {
          const { courseid } = query;
          dispatch({
            type: 'queryList',
            payload: {
              courseid,
            },
          });
        }
      });
    },
  },

  effects: {
    * queryList ({ payload }, { call, put, select }) {
      const { callback = '', isRefresh = false, courseid } = payload,
        _this = yield select(_ => _[`${namespace}`]),
        { paginations: { nowPage, total, rowCount }, listData, id } = _this,
        start = isRefresh ? 1 : nowPage,
        result = yield call(queryMembers, { courseid, nowPage, rowCount });
      if (result) {
        let { data = [], totalCount = 0 } = result,
          newLists = [];
        newLists = start === 1 ? data : [...listData, ...data];
        yield put({
          type: 'updateState',
          payload: {
            paginations: {
              ..._this.paginations,
              total: totalCount * 1,
              current: start + 1,
            },
            listData: newLists,
          },
        });
      }
      if (callback) {
        callback();
      }
    },
  },
});
