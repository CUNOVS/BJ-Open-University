import { request, config } from 'utils';

const { api } = config;
const { Login } = api;

export async function login (data, serverError = false) {
  return request({
    url: Login,
    method: 'post',
    data,
    serverError,
    hasToken: false,
  });
}

