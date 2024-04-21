// import { chatController } from '../../controllers/chatsControllers';
import Block from '../../utils/Block';
// import store, {StoreEvents} from '../../utils/store';
import template from './chat-item.hbs?raw';
import './chat-item.scss';

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

export default class ChatItem extends Block {
  constructor(props: chatsInterface) {
    super({ ...props });
  }

  render() {
    return template;
  }
}
