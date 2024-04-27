import icons from '../../assets/icons';
import Block from '../../utils/Block';
import Button from '../button';
import template from './chat-header.hbs?raw';
import './chat-header.scss';

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
  show?: boolean;
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

export default class chatHeader extends Block {
  constructor(props: chatsInterface) {
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
