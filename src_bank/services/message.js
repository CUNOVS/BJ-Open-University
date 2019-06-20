import { request, config } from 'utils';

const { api: { GetMessageCount, GetMessage, GetTalkMessage, GetConversation } } = config;

export async function queryMessageCount (payload) {
  return request({
    url: GetMessageCount,
    method: 'get',
    data: payload,
  });
}

export async function queryMessage (payload) {
  return request({
    url: GetMessage,
    method: 'get',
    data: payload,
  });
}

export async function queryTalkMessage (payload) {
  return request({
    url: GetTalkMessage,
    method: 'get',
    data: payload,
  });
}

export async function queryConversation (payload) {
  return request({
    url: GetConversation,
    method: 'get',
    data: payload,
  });
}
