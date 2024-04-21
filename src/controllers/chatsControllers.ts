import { chatsApi } from '../api/chatsApi';
import store from '../utils/store';

type putUserData = {
  users: number[];
  chatId: number;
};


export class chatController {
  static async create(title: string) {
    try {
      chatsApi.createChat(title);
      this.getChats();
    } catch (err) {
      console.log(title);
    }
  }

  static async addUserToChat(data : putUserData) {
    try {
      await chatsApi.addUserToChat(data);
    } catch (err) {
      console.log(err)
    }
  }

  static async getChats() {
    try {
      const response = await chatsApi.getChats();
      store.set('chats', JSON.parse(response.response));
      // console.log(store);
      // console.log(JSON.parse(response.response))
    } catch {
      console.log('test');
    }
  }

  static async getChatToken(id: string) {
    try {
      const response = await chatsApi.getChatToken(id);

      store.set('token', JSON.parse(response.response).token);

      this.connectToChat()

    } catch {
      console.log('errr')
    }
  }

  static async getCurrentChat(id: string) {
    try {
      const response = await chatsApi.getCurrentChat(id);

      store.set('currentChatId', JSON.parse(response.response));

    } catch {
      console.log('test')
    }
  } 

  static async connectToChat() {
    try {
      const userId = store.getState().user.id;
      const chatId = store.getState().currentChatId;
      const token = store.getState().token;

      // console.log('userId', userId)
      // console.log('chatId', chatId)
      // console.log('token', token)
      // console.log('store', store)

      const socket = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`); 

      socket.addEventListener('open', () => {
        console.log('Соединение установлено');
      
        socket.send(JSON.stringify({
          content: 'Моё первое сообщение миру!',
          type: 'message',
        }));
      });

      socket.addEventListener('close', event => {
        if (event.wasClean) {
          console.log('Соединение закрыто чисто');
        } else {
          console.log('Обрыв соединения');
        }
      
        console.log(`Код: ${event.code} | Причина: ${event.reason}`);
      });

      socket.addEventListener('message', event => {
        console.log('Получены данные', event.data);
      });
      
      socket.addEventListener('error', event => {
        console.log('Ошибка', event);
      }); 


      console.log(socket)
      console.log('x')
    } catch {
      console.log('x')
    }
  }

}
