import { parse } from 'qs';
import modelExtend from 'dva-model-extend';
import { getLocalIcon } from 'utils';
import { Toast } from 'components';
import { routerRedux } from 'dva/router';
import {
  getQuizInfo,
  choiceQuestion,
  matchQuestion,
  getTimes,
  shortanswerQusetion,
  essayQusetion
} from 'utils/analysis';
import { queryExamination, queryLastTimeExamination, sendQuiz, querySummary } from 'services/resource';
import { model } from 'models/common';

const getAnswer = (data = {}) => {
  if (data.type === 'multichoice' || data.type === 'truefalse') {
    data.choose = choiceQuestion(data.html);
  } else if (data.type === 'essay') {
    data.choose = essayQusetion(data.html);
  } else if (data.type === 'match') {
    data.choose = matchQuestion(data.html);
  } else if (data.type === 'shortanswer') {
    data.choose = shortanswerQusetion(data.html);
  }
  data.formulation = getTimes(data.html);
  return data;
};
export default modelExtend(model, {
  namespace: 'quizDetails',
  state: {
    data: {},
    questions: [],
    info: {},
    answer: {},
    page: 0,
    navmethod: '',
    attemptid: '',
    timelimit: 0
  },
  subscriptions: {
    setupHistory ({ dispatch, history }) {
      history.listen(({ pathname, query, action }) => {
        if (pathname === '/quizDetails' && action === 'PUSH') {
          const { quizid, state, attemptid, page, navmethod = '', timelimit = 0 } = query;
          dispatch({
            type: 'updateState',
            payload: {
              navmethod,
              timelimit
            }
          });
          if (state !== 'inprogress') {
            dispatch({
              type: 'queryExamination',
              payload: {
                quizid,
              },
            });
          } else {
            dispatch({
              type: 'updateState',
              payload: {
                attemptid,
                page: page * 1,
              }
            });
            dispatch({
              type: 'queryLastTimeExamination',
              payload: {
                quizid,
                attemptid,
                page: page * 1,
              },
            });
            dispatch({
              type: 'querySummary',
              payload: {
                attemptid
              }
            });
          }
        }
      });
    },
  },
  effects: {
    * queryExamination ({ payload }, { call, put }) {
      const data = yield call(queryExamination, payload);
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            data,
            info: getQuizInfo(data.questions[0].html),
            answer: getAnswer(data.questions[0]),
            attemptid: data.id
          },
        });
        yield put({
          type: 'querySummary',
          payload: {
            attemptid: data.id
          }
        });
      } else {
        yield put({ type: 'goBack' });
        Toast.fail(data.message || '获取失败');
      }
    },

    * queryLastTimeExamination ({ payload }, { call, put }) {
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
      } else {
        Toast.fail(data.message || '获取失败');
        if (data.errorcode === 'attemptalreadyclosed') {
          yield put({ type: 'goback' });
        }
      }
    },

    * querySummary ({ payload }, { call, put }) {
      const data = yield call(querySummary, payload);
      if (data.success) {
        yield put({
          type: 'updateState',
          payload: {
            questions: data.questions,
          },
        });
      } else {
        Toast.fail(data.message);
      }
    },

    * sendQuiz ({ payload }, { call, put, select }) {
      const { navmethod, timelimit } = yield select(_ => _.quizDetails);
      const { name = '', type, data: params, attemptid, timeup, quizid, finishattempt = 0 } = payload;
      const data = yield call(sendQuiz, { ...params, attemptid, timeup, finishattempt });
      if (data.success) {
        if (type === 'finish') {
          yield put(routerRedux.push({
            pathname: '/quizComplete',
            query: {
              attemptid,
              name,
              quizid,
              navmethod,
              timelimit
            },
          }));
        }

        if (data.state === 'finished') { // 重置page
          yield put(routerRedux.replace({
            pathname: '/quizReview',
            query: {
              attemptid
            }
          }));
          yield put({
            type: 'updateState',
            payload: {
              data: {},
              questions: [],
              info: {},
              answer: {},
              page: 0,
              navmethod: '',
            }
          });
        }
      } else {
        Toast.fail(data.message || '提交失败');
      }
    },
  },
  reducers: {
    updateVal (state, { payload }) {
      const { id, value } = payload,
        { answer } = state;
      answer.choose.map(item => {
        item.checked = item.id === id;
      });
      return {
        ...state,
        answer,
      };
    },
    updateCheckVal (state, { payload }) {
      const { id } = payload,
        { answer } = state;
      const currentCheck = answer.choose.find(item => item.id === id).checked;
      answer.choose.find(item => item.id === id).checked = !currentCheck;
      return {
        ...state,
        answer,
      };
    },
    updateTextVal (state, { payload }) {
      const { value } = payload,
        { answer } = state;
      answer.choose.value = value;
      return {
        ...state,
        answer,
      };
    },
  }
});
