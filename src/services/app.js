import { request, config } from 'utils';

const { api: {  userLogout } } = config;



export async function logout () {
  return request({
    url: userLogout,
    method: 'get',
  });
}


