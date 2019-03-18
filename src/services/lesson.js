import { request, config } from 'utils';

const { api: { GetLessonDetails } } = config;

export async function queryLessonDetails (payload) {
  return request({
    url: GetLessonDetails,
    method: 'get',
    data: payload,
  });
}

