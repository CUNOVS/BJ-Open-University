import { request, config } from 'utils';

const { api: { GetPage, GetQuiz, GetHomeworkInfo, GetHomeWorkComments, GetExamination, GetLastTimeExamination, GetQuizReview } } = config;

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
