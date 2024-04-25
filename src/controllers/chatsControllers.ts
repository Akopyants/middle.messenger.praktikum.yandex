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
      const response = await chatsApi.createChat(title);
      if (response) {
        this.getChats();
      }
    } catch (err) {
      console.log(title);
    }
  }

  static async delete(id: number) {
    try {
      const response = await chatsApi.deleteChat(id);
      if (response) {
        this.getChats();
      }
    } catch (err) {
      console.log(err);
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

  static async sendMessage(value: string) {
    chatController.ws.send(
      JSON.stringify({
        content: value,
        type: 'message',
      }),
    );
  }

  // static async

  static async connectToChat() {
    try {
      const userId = store.getState().user.id;
      const chatId = store.getState().currentChatId;
      const token = store.getState().token;

      chatController.ws = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);

      chatController.ws.addEventListener('open', () => {
        console.log('Соединение установлено');

        chatController.ws.send(
          JSON.stringify({
            content: '0',
            type: 'get old',
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
          const state = store.getState();
          const messages = state.messages || {};
          const message = JSON.parse(event.data);
          
          if (Array.isArray(message)) {
            store.set(`messages.${chatId}`, [...message].reverse());
          } else {
            const currentMessages = messages[chatId] || [];
            const updatedMessages = [...currentMessages, message];

            store.set(`messages.${chatId}`, updatedMessages);
          }

          const chatBody = document.querySelector('.chat__body') as HTMLElement;
          chatBody.scrollTop = chatBody.scrollHeight;
        }
        
        const input = document.querySelector('.chat__footer input') as HTMLInputElement | null;
        input?.focus()
      });

      chatController.ws.addEventListener('error', (event) => {
        console.log('Ошибка', event);
      });
    } catch (err) {
      console.log(err);
    }
  }
}
