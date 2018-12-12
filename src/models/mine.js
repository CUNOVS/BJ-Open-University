import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { getLocalIcon } from 'utils';
import { model } from 'models/common';

const defaultDatas = [
  {
    icon: require('../themes/images/others/history.png'),
    text: '参加的课程',
    route: 'commonlist',
  },
  {
    icon: require('../themes/images/others/course.png'),
    text: '我的积分',
    route: '',
  },
  {
    icon: require('../themes/images/others/note.png'),
    text: '我的笔记',
    route: 'notelist',
  }, {
    icon: require('../themes/images/others/credit.png'),
    text: '我的收藏',
    route: 'commonlist',
  },
];
export default modelExtend(model, {
  namespace: 'mine',
  state: {},
  subscriptions: {
    setupHistory ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/mine') {
          dispatch({
            type: 'queryMessage',
          });
        }
      });
    }
    ,
  },
  effects: {
    * queryMessage ({ payload }, { call, put, select }) {
      yield put({
        type: 'updateState',
        payload: {
          gridDatas: defaultDatas,
        },
      });
    },
  },

});
