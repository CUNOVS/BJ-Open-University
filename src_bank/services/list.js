import { request, config } from 'utils';

const { api: { GetGroupList, GetGradeList, getTeachersList, GetMember } } = config;

export async function queryGroup (payload) {
  return request({
    url: GetGroupList,
    method: 'get',
    data: payload,
  });
}

export async function queryGradeDetails (payload) {
  return request({
    url: GetGradeList,
    method: 'get',
    data: payload,
  });
}

export async function queryTeachers (payload) {
  return request({
    url: getTeachersList,
    method: 'get',
    data: payload,
  });
}

export async function queryMembers (payload) {
  return request({
    url: GetMember,
    method: 'get',
    data: payload,
  });
}
