import Block from '../../utils/Block';
import template from './chat-item.hbs?raw';
import './chat-item.scss';

interface InterfaceChatItem {
  avatarSrc?: string;
  name: string;
  lastMessage?: string;
  unreadMessages?: string;
  time?: string;
}

export default class ChatItem extends Block {
  constructor(props: InterfaceChatItem) {
    super({ ...props });
  }

  render() {
    return template;
  }
}
