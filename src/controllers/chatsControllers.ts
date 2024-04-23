import { chatsApi } from '../api/chatsApi';
import store from '../utils/store';

type putUserData = {
  users: number[];
  chatId: number;
};

export class chatController {
  static ws: WebSocket;

  static async create(title: string) {
    try {
      chatsApi.createChat(title);
      this.getChats();
    } catch (err) {
      console.log(title);
    }
  }

  static async addUserToChat(data: putUserData) {
    try {
      await chatsApi.addUserToChat(data);
    } catch (err) {
      console.log(err);
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

      this.connectToChat();
    } catch {
      console.log('errr');
    }
  }

  static async getCurrentChat(id: string) {
    try {
      const response = await chatsApi.getCurrentChat(id);

      store.set('currentChatId', JSON.parse(response.response));
    } catch {
      console.log('test');
    }
  }

  static async sendMessage(id: string, value: string) {
    console.log(id);
    console.log(value);
    // store.set(`messages.${chatid}`, id.[...mesages]);


    chatController.ws.send(
      JSON.stringify({
        content: value,
        type: 'message',
      }),
    );
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

      chatController.ws = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);

      chatController.ws.addEventListener('open', () => {
        console.log('Соединение установлено');

        chatController.ws.send(
          JSON.stringify({
            content: 'Моё первое сообщение миру!',
            type: 'message',
          }),
        );
      });

      chatController.ws.addEventListener('close', (event) => {
        if (event.wasClean) {
          console.log('Соединение закрыто чисто');
        } else {
          console.log('Обрыв соединения');
        }

        console.log(`Код: ${event.code} | Причина: ${event.reason}`);
      });

      chatController.ws.addEventListener('message', (event) => {
        if (chatId) {
          const newMessage = [];
          const message = event.data;
        
          newMessage.push(JSON.parse(message));
        
          const state = store.getState();
          const messages = state.messages || {}; 
        
          const currentMessages = messages[chatId] || [];
        
        
          const updatedMessages = [...currentMessages, ...newMessage];
        
          store.set(`messages.${chatId}`, updatedMessages);
          

          console.log(store)
        }
   

      });

      chatController.ws.addEventListener('error', (event) => {
        console.log('Ошибка', event);
      });

      console.log(chatController.ws);
      console.log('x');
    } catch {
      console.log('x');
    }
  }
}
