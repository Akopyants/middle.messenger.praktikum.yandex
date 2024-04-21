import apiUrl from './apiUrl';
import BaseAPI from '../utils/BaseApi';
import HTTPTransport from '../utils/HTTPTransport';

const fetch = new HTTPTransport(`${apiUrl}/chats`);

class ChatsApi extends BaseAPI {
  createChat(title: string) {
    return fetch.post('/', { data: { title } });
  }

  getChats() {
    return fetch.get('');
  }

  getChatToken(id: string) {
    return fetch.post(`/token/${id}`);
  }

  getCurrentChat(id: string) {
    return fetch.get(`${id}/common`)
  }
}

export const chatsApi = new ChatsApi();
