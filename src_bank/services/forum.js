import { request, config } from 'utils';

const { api: { GetForum, AddNewForum } } = config;

export async function queryForum (payload) {
  return request({
    url: GetForum,
    method: 'get',
    data: payload,
  });
}

export async function addNewForum (payload) {
  return request({
    url: AddNewForum,
    method: 'post',
    data: payload,
  });
}

