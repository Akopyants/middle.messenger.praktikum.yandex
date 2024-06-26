import icons from '../../assets/icons';
import Block from '../../utils/Block';
import Button from '../button';
import template from './chat-header.hbs?raw';
import './chat-header.scss';

interface UserInterface {
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

interface ChatsInterface {
  show?: boolean;
  id?: number;
  title?: string;
  avatar?: string;
  created_by?: number;
  unread_count?: number;
  last_message?: {
    user?: UserInterface;
    time?: string;
    content?: string;
    id?: number;
  };
  showAddUserButton: boolean;
  events?: {
    click: (e: Event) => void;
  };
}

export default class ChatHeader extends Block {
  constructor(props: ChatsInterface) {
    super({
      ...props,
    });

    this.children.addUserButton = new Button({
      square: true,
      className: 'button-add-user',
      icon: icons.plus,
    });

    this.children.removeUserButton = new Button({
      square: true,
      className: 'button-remove-user',
      icon: icons.minus,
    });
  }

  render() {
    return template;
  }
}
