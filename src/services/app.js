import { request, config } from 'utils';

const { api: { userLogout, GetBaseInfo, GetUserInfo, GetMedalList, AddContacts, DeleteContacts, GetAttendance, GetAttendanceList, AccessTime, Log } } = config;


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
    data
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


export async function AddContact (data) {
  return request({
    url: AddContacts,
    method: 'post',
    data,
  });
}

export async function DeleteContact (data) {
  return request({
    url: DeleteContacts,
    method: 'post',
    data,
  });
}

export async function getAttendance (data) {
  return request({
    url: GetAttendance,
    method: 'get',
    data,
  });
}

export async function getAttendanceList (data) {
  return request({
    url: GetAttendanceList,
    method: 'get',
    data,
  });
}

export async function accessTime (data) {
  return request({
    url: AccessTime,
    method: 'post',
    data,
    hasToken: false
  });
}

export async function logApi (data) {
  return request({
    url: Log,
    method: 'post',
    data,
    hasToken: false
  });
}
