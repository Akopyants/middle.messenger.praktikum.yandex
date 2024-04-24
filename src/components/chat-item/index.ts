import icons from '../../assets/icons';
import { chatController } from '../../controllers/chatsControllers';
import Block from '../../utils/Block';
import store from '../../utils/store';
import Button from '../button';
import template from './chat-item.hbs?raw';
import './chat-item.scss';

interface chatsInterface {
  id?: number;
  title?: string;
  avatar?: string;
  created_by?: number;
  unread_count?: number;
  lastMessage?: string;
  showAddUserButton: boolean;
  lastMessageLogin?: string;
  unreadCount?: number;
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
          store.set('currentChatId', id);
          
          chatController.getChatToken(id as string);
        },
      },
    });

    this.children.addUserButton = new Button({
      square: true,
      className: 'button-add-user',
      icon: icons.plus,
    });
  }

  render() {
    return template;
  }
}
