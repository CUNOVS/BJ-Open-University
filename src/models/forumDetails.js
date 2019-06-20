import modelExtend from 'dva-model-extend';
import { queryReply, ReplyForum } from 'services/forum';
import { Toast } from 'components';
import { model } from 'models/common';

const GetParent = (data) => data.find(item => item.parent === 0),
  getList = (data) => data.filter(item => GetParent(data)
    .children
    .includes(item.id));

export default modelExtend(model, {
  namespace: 'forumDetails',
  state: {
    data: [],
    parent: {},
    replyList: []
  },
  subscriptions: {
    setup ({ history, dispatch }) {
      history.listen(({ pathname, action, query }) => {
        if (pathname === '/forumDetails') {
          if (action === 'PUSH') {
            const { discussionid } = query;
            dispatch({
              type: 'query',
              payload: {
                discussionid
              }
            });
          }
        }
      });
    },
  },
  effects: {
    * query ({ payload }, { call, put, select }) {
      const { success, message = '请稍后再试', posts = [] } = yield call(queryReply, payload);
      if (success) {
        yield put({
          type: 'updateState',
          payload: {
            data: posts,
            parent: GetParent(posts),
            replyList: getList(posts)
          }
        });
      } else {
        Toast.fail(message);
      }
    },
  }
});
