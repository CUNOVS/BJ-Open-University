import { request, config } from 'utils';

const { api } = config;
const { ListApi } = api;

export async function getList () {
  return request({
    url: 'https://bjdemo.herokuapp.com/',
    method: 'get',
  });
}

