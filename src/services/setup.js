import { request, config, formsubmit } from 'utils';

const { api } = config;
const { SetAvatar } = api;

export async function setAvatar (payload) {
  return request({
    url: SetAvatar,
    method: 'post',
    data: payload,
  });
}

