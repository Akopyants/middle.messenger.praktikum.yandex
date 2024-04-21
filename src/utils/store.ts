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

interface chatsInterface {
  id?: number;
  title?: string;
  avatar?: string;
  created_by?: number;
  unread_count?: number;
  last_message?: {
    user?: userInterface;
    time?: string;
    content?: string;
    id?: number;
  };
}

interface storeInterface {
  user: userInterface;
  chats: chatsInterface[];
}

class Store extends EventBus {
  private state: storeInterface = {
    user: {},
    chats: [],
    // currentChat: { unread_count: 0 },
    // chats: [],
    // currentMessages: [],
    // isLoggedIn: false,
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
