import { request, config } from 'utils';

const { api } = config;
const { LoginApi } = api;

export async function login (data, serverError = false) {
  return request({
    url: LoginApi,
    method: 'post',
    data,
    serverError
  });
}


