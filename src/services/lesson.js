import { request, config } from 'utils';

const { api: { GetLessonDetails, GetOpeningLessons, GetClosedLessons, ManualCompletion } } = config;

export async function queryLessonDetails (payload) {
  return request({
    url: GetLessonDetails,
    method: 'get',
    data: payload,
  });
}

export async function queryOpeningLessons (payload) {
  return request({
    url: GetOpeningLessons,
    method: 'get',
    data: payload,
  });
}

export async function queryClosedLessons (payload) {
  return request({
    url: GetClosedLessons,
    method: 'get',
    data: payload,
  });
}

export async function manualCompletion (payload) {
  return request({
    url: ManualCompletion,
    method: 'post',
    data: payload,
  });
}
