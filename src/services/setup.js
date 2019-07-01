import { request, config, formsubmit } from 'utils';

const { api } = config;
const { SetAvatar, UpdateInfo } = api;

export async function setAvatar (payload) {
  return request({
    url: SetAvatar,
    method: 'post',
    data: payload,
  });
}

export async function updateInfo (payload) {
  return request({
    url: UpdateInfo,
    method: 'post',
    data: payload,
    hasToken: false
  });
}
