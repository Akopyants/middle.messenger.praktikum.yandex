import EventBus from './EventBus';
import set from './set';

export enum StoreEvents {
  Updated = 'updated',
}

interface userInterface {
  avatar?: string;
  display_name?: string;
  first_name?: string;
  second_name?: string;
  login?: string;
  email?: string;
  phone?: string;
  role?: string;
  id?: number;
}

interface interfaceMessage {
  user?: userInterface;
  time?: string;
  content?: string;
  id?: number;
}

interface chatsInterface {
  id?: number;
  title?: string;
  avatar?: string;
  created_by?: number;
  unread_count?: number;
  last_message?: interfaceMessage
}

interface ChatUser {
  id: number;
  // first_name: string;
  // second_name: string;
  // display_name: string | null;
  login: string;
  // avatar: string | null;
  // role: 'regular' | 'admin';
}

interface storeInterface {
  user: userInterface;
  chats: chatsInterface[];
  messages?: Record<string, interfaceMessage[]>;
  currentChatId: string;
  token: string;
  currentChatUsers?: ChatUser[];
}



class Store extends EventBus {
  private state: storeInterface = {
    user: {},
    chats: [],
    token: '',
    currentChatId: '',
    currentChatUsers: [],
    messages: {}
  };

  public getState() {
    return this.state;
  }

  public set(path: string, value: unknown) {
    set(this.state, path, value);
    this.emit(StoreEvents.Updated);
  }
}

export default new Store();
