import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { getLocalIcon } from 'utils';
import { model } from 'models/common';

const defaultDatas = [
  {
    icon: require('../themes/images/others/teacher.jpg'),
    text: '我的老师',
    route: 'commonlist',
  },
  {
    icon: require('../themes/images/others/group.jpg'),
    text: '我的小组',
    route: '',
  },
  {
    icon: require('../themes/images/others/achievement.jpg'),
    text: '我的成绩',
    route: 'notelist',
  }, {
    icon: require('../themes/images/others/attendance.jpg'),
    text: '我的考勤',
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
