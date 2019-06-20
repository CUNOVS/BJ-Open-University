import modelExtend from 'dva-model-extend';
import { model } from 'models/common';

const bannerNotice = [
    '新人注册专享35sdfgsdsd第三个发送到该发生地方噶水电费感受到发给元大礼包，你来我就送',
    '通大量精选课程限时免费学习',
  ],
  defaultContent = '美国《国家地理》是个怪物，他们每一张照片一定需要特殊的、但是又要一般读者看的懂的别致视觉效果，还要尽量讲究用光。所以它的摄影师们要千方百计的拍出与众不同的影像来，这样复杂怪异的器材需求也就很难避免了。虽然国家地理的摄影师们可以很威风的携带航空母舰般的器材上路，但是他们的名声和他们的器材常常不成正比。这一点看看更权威的摄影大师们的评论就可以知道，普遍认为《国家地理》的摄影师们花哨的东西太多，而对于影像挖掘方面的贡献太小了，当然，《国家地理》本来是一家主流大众刊物，更看重的当然是影像的商业化，似乎也无可厚非。\n' +
    '其实在西方，除了商业摄影师，很多很严肃的纪实摄影师和报道摄影师都是很穷的，不可能买的起那么多昂贵的器材，即便他已经成了大师！';
export default modelExtend(model, {
  namespace: 'moreMessageItem',
  state: {
    banner: [],
    content: '',
  },
  subscriptions: {
    setup ({ history, dispatch }) {
      history.listen(({ pathname, action, query }) => {
        if (pathname === '/moreMessageItem') {
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
          banner: bannerNotice,
          content: defaultContent,
        },
      });
    },
  },
});

