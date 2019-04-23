import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { getLocalIcon } from 'utils';
import { getQuizInfo, choiceQuestion, matchQuestion } from 'utils/analysis';
import { queryExamination, queryLastTimeExamination } from 'services/resource';
import { model } from 'models/common';

const getAnswer = (data = {}) => {
  if (data.type === 'multichoice' || data.type === 'truefalse') {
    console.log(choiceQuestion(data.html));
    return { type: 'choose', item: choiceQuestion(data.html) };
  } else if (data.type === 'essay') {
    return {
      type: 'essay', item: [],
    };
  } else if (data.type === 'shortanswer') {
    return {
      type: 'shortanswer', item: [],
    };
  } else if (data.type === 'match') {
    return {
      type: 'match', item: matchQuestion(data.html),
    };
  }
};
export default modelExtend(model, {
  namespace: 'quizDetails',
  state: {
    data: {},
    info: {},
    answer: {},
  },
  subscriptions: {
    setupHistory ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/quizDetails') {
          const { quizid, state, attemptid, page } = query;
          if (state !== 'inprogress') {
            dispatch({
              type: 'queryExamination',
              payload: {
                quizid,
              },
            });
          } else {
            dispatch({
              type: 'queryLastTimeExamination',
              payload: {
                quizid,
                attemptid,
                page,
              },
            });
          }
        }
      });
    },
  },
  effects: {
    * queryExamination ({ payload }, { call, put, select }) {
      const data = yield call(queryExamination, payload);
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            data,
          },
        });
      }
    },

    * queryLastTimeExamination ({ payload }, { call, put, select }) {
      const data = yield call(queryLastTimeExamination, payload);
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            data,
            info: getQuizInfo(data.questions[0].html),
            answer: getAnswer(data.questions[0]),
          },
        });
      }
    },
  },

});
