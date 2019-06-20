import { request, config } from 'utils';

const { api: { userLogout, GetBaseInfo, GetUserInfo, GetMedalList } } = config;


export async function logout () {
  return request({
    url: userLogout,
    method: 'get',
  });
}

export async function queryBaseInfo (data) {
  const { usertoken, userid } = data;
  return request({
    url: `${GetBaseInfo}/${usertoken}/${userid}`,
    method: 'get',
    hasToken: false,
  });
}

export async function queryUserInfo (data) {
  return request({
    url: GetUserInfo,
    method: 'get',
    data,
  });
}
export async function queryMedalList (data) {
  return request({
    url: GetMedalList,
    method: 'get',
    data,
  });
}
