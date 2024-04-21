import { chatsApi } from "../api/chatsApi"
import store from "../utils/store";

// import router from '../router';
// import store from '../utils/store';

export class chatController {
  static async create (title: string) {
    try {
      chatsApi.createChat(title);
      this.getChats();
    } catch (err) {
      console.log(title)
    }
  }

  static async getChats () {
    try {
      const response = await chatsApi.getChats();
      store.set('chats', JSON.parse(response.response));
      console.log(store);
      // console.log(JSON.parse(response.response))
    } catch {
      console.log('test')
    }
  }
}
