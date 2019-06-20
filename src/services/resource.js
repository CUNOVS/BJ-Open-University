import { request, config } from 'utils';

const { api: { GetPage, GetQuiz, GetHomeworkInfo, GetHomeWorkComments, GetExamination, GetLastTimeExamination, GetQuizReview, ADDHomeWork, UrlApi, GetFeedBack, GetFeedBackInfos, GetFeedBackQuestions, SendFeedBack, GetSuperClass, CompleteFeedBack, SendQuiz, GetQuizSummary } } = config;

export async function queryPage (payload) {
  return request({
    url: GetPage,
    method: 'get',
    data: payload,
  });
}

export async function queryQuiz (payload) {
  return request({
    url: GetQuiz,
    method: 'get',
    data: payload,
  });
}

export async function queryExamination (payload) {
  return request({
    url: GetExamination,
    method: 'get',
    data: payload,
  });
}

export async function queryReview (payload) {
  return request({
    url: GetQuizReview,
    method: 'get',
    data: payload,
  });
}

export async function querySummary (payload) {
  return request({
    url: GetQuizSummary,
    method: 'get',
    data: payload,
  });
}

export async function queryLastTimeExamination (payload) {
  return request({
    url: GetLastTimeExamination,
    method: 'get',
    data: payload,
  });
}


export async function queryHomework (payload) {
  return request({
    url: GetHomeworkInfo,
    method: 'get',
    data: payload,
  });
}

export async function queryHomeWorkComments (payload) {
  return request({
    url: GetHomeWorkComments,
    method: 'get',
    data: payload,
  });
}

export async function addHomeWork (payload) {
  return request({
    url: ADDHomeWork,
    method: 'post',
    data: payload,
  });
}

export async function url (payload) {
  return request({
    url: UrlApi,
    method: 'get',
    data: payload,
  });
}

export async function querySuperClass (payload) {
  return request({
    url: GetSuperClass,
    method: 'get',
    data: payload,
  });
}

export async function queryFeedback (payload) {
  return request({
    url: GetFeedBack,
    method: 'get',
    data: payload,
  });
}

export async function queryFeedBackInfos (payload) {
  return request({
    url: GetFeedBackInfos,
    method: 'get',
    data: payload,
  });
}

export async function queryFeedbackQuestions (payload) {
  return request({
    url: GetFeedBackQuestions,
    method: 'Get',
    data: payload,
  });
}

export async function sendFeedBack (payload) {
  return request({
    url: SendFeedBack,
    method: 'post',
    data: payload,
  });
}

export async function completeFeedBack (payload) {
  return request({
    url: CompleteFeedBack,
    method: 'post',
    data: payload,
  });
}

export async function sendQuiz (payload) {
  return request({
    url: SendQuiz,
    method: 'post',
    data: payload,
  });
}
