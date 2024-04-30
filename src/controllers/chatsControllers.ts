import { chatsApi } from '../api/chatsApi';
import store from '../utils/store';

type PutUserData = {
  users: number[];
  chatId: number;
};

export class ChatController {
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

  static async addUserToChat(data: PutUserData) {
    try {
      await chatsApi.addUserToChat(data);
    } catch (err) {
      console.log(err);
    }
  }

  static async getChats() {
    try {
      const response = await chatsApi.getChats();
      try {
        store.set('chats', JSON.parse(response.response));
      } catch (error) {
        console.log(error);
      }
    } catch {
      console.log('test');
    }
  }

  static async getChatToken(id: string) {
    try {
      const response = await chatsApi.getChatToken(id);
      try {
        store.set('token', JSON.parse(response.response).token);
      } catch (error) {
        console.log(error);
      }

      this.connectToChat();
    } catch {
      console.log('errr');
    }
  }

  static async getCurrentChat(id: string) {
    try {
      const response = await chatsApi.getCurrentChat(id);
      try {
        store.set('currentChatId', JSON.parse(response.response));
      } catch (error) {
        console.log(error);
      }
    } catch {
      console.log('test');
    }
  }

  static async getChatUsers(id: number) {
    try {
      const response = await chatsApi.getChatUsers(id);
      try {
        store.set('currentChatUsers', JSON.parse(response.response));
      } catch (error) {
        console.log(error);
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async deleteUsersFromChat(usersId: number, chatId: number) {
    try {
      await chatsApi.deleteUserFromChat(usersId, chatId);
      const response = await chatsApi.getChatUsers(chatId);
      try {
        store.set('currentChatUsers', JSON.parse(response.response));
      } catch (error) {
        console.log(error);
      }
    } catch (err) {
      console.log(err);
    }
  }

  static async sendMessage(value: string) {
    ChatController.ws.send(
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

      ChatController.ws = new WebSocket(`wss://ya-praktikum.tech/ws/chats/${userId}/${chatId}/${token}`);

      ChatController.ws.addEventListener('open', () => {
        console.log('Соединение установлено');

        ChatController.ws.send(
          JSON.stringify({
            content: '0',
            type: 'get old',
          }),
        );
      });

      ChatController.ws.addEventListener('close', (event) => {
        if (event.wasClean) {
          console.log('Соединение закрыто чисто');
        } else {
          console.log('Обрыв соединения');
        }

        console.log(`Код: ${event.code} | Причина: ${event.reason}`);
      });

      ChatController.ws.addEventListener('message', (event) => {
        if (chatId) {
          const state = store.getState();
          const messages = state.messages || {};
          try {
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
          } catch (error) {
            console.log(error);
          }
        }

        const input = document.querySelector('.chat__footer input') as HTMLInputElement | null;
        input?.focus();
      });

      ChatController.ws.addEventListener('error', (event) => {
        console.log('Ошибка', event);
      });
    } catch (err) {
      console.log(err);
    }
  }
}
