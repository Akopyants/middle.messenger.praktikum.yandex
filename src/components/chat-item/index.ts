// import { chatController } from '../../controllers/chatsControllers';
// import authControllers from '../../controllers/authControllers';
import icons from '../../assets/icons';
import { chatController } from '../../controllers/chatsControllers';
import Block from '../../utils/Block';
import store from '../../utils/store';
import Button from '../button';
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
  showAddUserButton: boolean;
  events?: {
    click: (e: Event) => void;
  };
}

export default class ChatItem extends Block {
  constructor(props: chatsInterface) {
    super({
      ...props,
      events: {
        click: async () => {
          const id = this.getProps().id;
          store.set('currentChatId', id)
          chatController.getChatToken(id as string);

          console.log(this)
        },
      },
    });

    this.children.addUserButton = new Button({
      square: true,
      className: 'button-add-user',
      icon: icons.plus,
      events: {
        click: (e: Event) => {
          const targetElement = e.target as HTMLElement; 
          const chatItemElement = targetElement.closest('.chat-item') as HTMLElement | null;
      
          if (chatItemElement) {
            const chatId = chatItemElement.dataset.id;
            console.log(chatId);


            console.log(store)
          }
        }
      }
    })
  }

  render() {
    return template;
  }
}
