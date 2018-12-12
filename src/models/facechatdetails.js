import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { model } from 'models/common';

const defaultDate = {
  img: require('../themes/images/facechat/01.jpg'),
  title: '摄影爱好者',
  founder: '王刚',
  people: '2490',
  tags: [
    { title: '摄影' },
    { title: '艺术' },
  ],
};
const defaultDiscuss = [
  {
    title: '经典问题！！尼康还是佳能',
    content: '前段时间看到了一个非常有趣的文案提问，关于索尼、尼康、佳能三大相机器材厂商，哪一家更好？都有哪些优缺点？',
    createDate: '2018.11.15',
    review: '23',
  },
  { title: '《西游记》中玉皇大帝到底有没有战斗力？', content: '之前看西游记特别感觉玉皇大帝一点法力都没有，那时候我爸还坐在一边，然后问了一嘴，他说，姜子牙自己想做玉皇大帝，封神的时候旁边人问玉皇大帝谁当，姜子牙说，有人当。结果被逃难的张有人听到了，然后说了声到，就成了玉皇大帝。', createDate: '2018.11.15', review: '23' },
  { title: '《西游记》中，唐僧为何屡次偏向猪八戒？', content: '唐僧虽是明面上的领导，但其实跟悟空是平级。西行四人，只有唐僧和悟空两人是内定的，后来修成正果加封的时候，两人都是佛，是平级。悟空跟唐僧的关系是合作关系，这在原著里有表现：原著中，西行取经，是孙悟空保唐僧取经，而不是唐僧带着孙悟空去取经。这里面的含义不同。悟空说过自己只拜过三人，西天拜佛祖，南海拜观音，两界山因为唐僧救过他，所以拜了四拜。后来就没有拜过唐僧了。所以，从唐僧角度看，除了救了悟空出狱之外，什么恩惠都没有施给悟空。而且这个恩惠还是如来派菩萨早就安排好的。\n' +
      '\n' +
      '作者：恒子\n' +
      '链接：https://www.zhihu.com/question/55075445/answer/499367412\n' +
      '来源：知乎\n' +
      '著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。', createDate: '2018.11.15', review: '23' },
  {
    title: '经典问题！！尼康还是佳能',
    content: '前段时间看到了一个非常有趣的文案提问，关于索尼、尼康、佳能三大相机器材厂商，哪一家更好？都有哪些优缺点？',
    createDate: '2018.11.15',
    review: '23',
  },
];


export default modelExtend(model, {
  namespace: 'facechatdetails',
  state: {
    data: {},
  },
  subscriptions: {
    setup ({ history, dispatch }) {
      history.listen(({ pathname, action, query }) => {
        if (pathname === '/facechatdetails') {
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
          data: defaultDate,
          card: defaultDiscuss,
        },
      });
    },

  },
});
