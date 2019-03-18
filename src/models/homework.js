import modelExtend from 'dva-model-extend';
import { model } from 'models/common';

const defaultListData = [
  {
    image: require('../themes/images/list/01.jpg'),
    title: 'Web前端开发之JavaScript精英课堂【渡一教育】',
    time: '98',
    yep: false
  },
  {
    image: require('../themes/images/list/02.jpg'),
    title: '淘宝运营 引爆店铺免费流量 搜索排名 直通车新玩法【思睿电商】',
    time: '69',
    yep: false
  },
  {
    image: require('../themes/images/list/03.jpg'),
    title: 'Sai商业插画班、萌系漫画、Q版设计三位老师传授二次元绘画秘籍',
    time: '30',
    yep: false
  },
  {
    image: require('../themes/images/list/04.jpg'),
    title: '摄影拍摄/摄影后期修图/人像后期/影楼后期/PS商业修图/风光调色',
    time: '34',
    yep: false
  },
  {
    image: require('../themes/images/list/05.png'),
    title: '（今晚直播）3DMAX建模效果图 CAD VRAY PS 室内设计 家装工装',
    time: '45',
    yep: false
  },
];

export default modelExtend(model, {
  namespace: 'homework',
  state: {
  },
  subscriptions: {
    setup ({ history, dispatch }) {
      history.listen(({ pathname, action, query }) => {
        if (pathname === '/homework') {
		          dispatch({
		            type: 'query',
		          });				
        }
      });
    },
  },
  effects: {
	    * query ({ payload }, { call, put, select }) {
		      yield put({
		        type: 'updateState',
		        payload: {
		          listData: defaultListData
		        },
		      });
	    },
  }
});
