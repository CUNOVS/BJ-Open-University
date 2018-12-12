import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';

const defaultBannerDatas = [
  require('../themes/images/banner/banner1.png'),
  require('../themes/images/banner/banner2.png'),
  require('../themes/images/banner/banner3.png'),
  require('../themes/images/banner/banner4.png'),
];

const defaultNewCourse = [
  {
    text: 'Vue2.5开发去哪网App 从零基础入门',
    bgColor: 'linear-gradient(to bottom, #d6d478 0%,#dfd889 31%,#dfd889 32%,#dfd889 32%,#dfd889 57%,#e0d996 62%,#e0d996 62%,#ede7bf 100%)',
  },
  { text: 'Java读源码之Nettys深入剖析', bgColor: 'rgba(255,192,203,.3)', color: '#fb768dfc' },
  { text: '全网最热Python3入门+进阶 更快上手实际开发', bgColor: 'rgba(0,175,255,.3)', color: '#00aaff' },
  { text: 'Javascript 设计模式系统讲解与应用', bgColor: 'rgba(0,255,151,.3)', color: '#477959' },
];
const defaultInfoDatas = [
  { text: '[艾德]营养师考试通关课程', image: require('../themes/images/newcourse/c01.jpg'), lessonType: 'free' },
  { text: '执业兽医资格考试真题解析班', image: require('../themes/images/newcourse/c02.jpg'), price: '250', lessonType: 'pay' },
  { text: '设计软件基础班PS/Ai/C4D', image: require('../themes/images/newcourse/c03.jpg'), lessonType: 'attend' },
  { text: 'Photoshop后期从初级到高级（精修、调色、合成）大师班', image: require('../themes/images/newcourse/c04.jpg'), lessonType: 'free' },
];
const defaultListData = [
  {
    image: require('../themes/images/list/01.jpg'),
    title: 'Web前端开发之JavaScript精英课堂【渡一教育】',
    price: '240',
    people: '2490',
  },
  {
    image: require('../themes/images/list/02.jpg'),
    title: '淘宝运营 引爆店铺免费流量 搜索排名 直通车新玩法【思睿电商】',
    price: '140',
    people: '5125',
  },
  {
    image: require('../themes/images/list/03.jpg'),
    title: 'Sai商业插画班、萌系漫画、Q版设计三位老师传授二次元绘画秘籍',
    price: '20',
    people: '1230',
  },
  {
    image: require('../themes/images/list/04.jpg'),
    title: '摄影拍摄/摄影后期修图/人像后期/影楼后期/PS商业修图/风光调色',
    price: '99',
    people: '254',
  },
  {
    image: require('../themes/images/list/05.png'),
    title: '（今晚直播）3DMAX建模效果图 CAD VRAY PS 室内设计 家装工装',
    price: '34',
    people: '23',
  },

];
const defaultSpecialData = [
  {
    image: require('../themes/images/special/s01.jpg'),
    title: '兽医外科手术学',
    price: '240',
    people: '2490',

  },
  {
    image: require('../themes/images/special/s02.jpg'),
    title: '物理-力学CPA',
    price: '140',
    people: '5125',

  },
  {
    image: require('../themes/images/special/s03.jpg'),
    title: '半导体物理学',
    price: '20',
    people: '1230',
  },
  {
    image: require('../themes/images/special/s04.jpg'),
    title: '广播节目与播音主持',
    price: '99',
    people: '254',

  },
];

const defaultCarouseDatas = [
  {
    icon: require('../themes/images/grid/01.png'),
    text: 'IT互联网',
    route: 'curriculum',
  },
  {
    icon: require('../themes/images/grid/02.png'),
    text: '外语',
    route: 'curriculum',
  },
  {
    icon: require('../themes/images/grid/03.png'),
    text: '文学历史',
    route: 'curriculum',
  }, {
    icon: require('../themes/images/grid/04.png'),
    text: '有机高分子',
    route: 'curriculum',
  },
  {
    icon: require('../themes/images/grid/05.png'),
    text: '生命科学',
    route: 'curriculum',
  },
  {
    icon: require('../themes/images/grid/06.png'),
    text: '工学',
    route: 'curriculum',
  },
  {
    icon: require('../themes/images/grid/07.png'),
    text: '经理管理',
    route: 'curriculum',
  },
  {
    icon: require('../themes/images/grid/08.png'),
    text: '考研',
    route: 'curriculum',
  },
  {
    icon: require('../themes/images/grid/01.png'),
    text: '哲学',
    route: 'curriculum',
  },
];
const bannerNotice = [
  '新人注册专享35sdfgsdsd第三个发送到该发生地方噶水电费感受到发给元大礼包，你来我就送',
  '通大量精选课程限时免费学习',
];
export default modelExtend(model, {
  namespace: 'dashboard',

  state: {
    bannerDatas: [],
    newCourse: [],
    listData: [],
    specialData: [],
    infoDatas: [],
    carouseDatas: [],
    bannerNotice: [],
  },

  subscriptions: {
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => {
        if (pathname === '/dashboard' || pathname === '/') {
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
          bannerDatas: defaultBannerDatas,
          newCourse: defaultNewCourse,
          listData: defaultListData,
          specialData: defaultSpecialData,
          infoDatas: defaultInfoDatas,
          carouseDatas: defaultCarouseDatas,
          bannerNotice: bannerNotice,
        },
      });
    },
  },
});
