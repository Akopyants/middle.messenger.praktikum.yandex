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
}

export const chatsApi = new ChatsApi();
