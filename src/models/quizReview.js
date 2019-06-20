import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { getLocalIcon } from 'utils';
import { Toast } from 'components';
import {
  getQuizInfo,
  choiceQuestion,
  matchQuestion,
  getTimes,
  shortanswerQusetion,
  essayQusetion
} from 'utils/analysis';
import { queryReview } from 'services/resource';
import { model } from 'models/common';

const getAnswer = (data = []) => {
  data.map(item => {
    if (item.type === 'multichoice' || item.type === 'truefalse') {
      item.choose = choiceQuestion(item.html);
    } else if (item.type === 'essay') {
      item.choose = essayQusetion(item.html);
    } else if (item.type === 'match') {
      item.choose = matchQuestion(item.html);
    } else if (item.type === 'shortanswer') {
      item.choose = shortanswerQusetion(item.html);
    }
    item.info = getQuizInfo(item.html);
  });
  // data.formulation = getTimes(data.html);
  return data;
};

export default modelExtend(model, {
  namespace: 'quizReview',
  state: {
    data: {},
    questions: []
  },
  subscriptions: {
    setupHistory ({ dispatch, history }) {
      history.listen(({ pathname, query }) => {
        if (pathname === '/quizReview') {
          const { attemptid } = query;
          dispatch({
            type: 'queryReview',
            payload: {
              attemptid,
            },
          });
        }
      });
    },
  },
  effects: {
    * queryReview ({ payload }, { call, put }) {
      const data = yield call(queryReview, payload);
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            data,
            questions: getAnswer(data.questions),
          },
        });
      } else {
        Toast.fail(data.message);
      }
    },
  },

});
