import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { getLocalIcon } from 'utils';
import { model } from 'models/common';

const defaultDatas = [
  {
    icon: require('../themes/images/others/teacher.jpg'),
    text: '我的老师',
    route: 'teachers',
  },
  {
    icon: require('../themes/images/others/group.jpg'),
    text: '我的小组',
    route: 'group',
  },
  {
    icon: require('../themes/images/others/achievement.jpg'),
    text: '我的成绩',
    route: 'achievement',
  }, {
    icon: require('../themes/images/others/attendance.jpg'),
    text: '我的考勤',
    route: 'attendance',
  },
];
export default modelExtend(model, {
  namespace: 'mine',
  state: {
    gridDatas: defaultDatas,
  },
  subscriptions: {
    setupHistory ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/mine') {

        }
      });
    }
    ,
  },
  effects: {},

});
