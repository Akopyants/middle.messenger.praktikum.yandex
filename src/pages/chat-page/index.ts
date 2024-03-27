import icons from '../../assets/icons';
import Button from '../../components/button';
import ChatItem from '../../components/chat-item';
import Input from '../../components/input';
import Link from '../../components/link';
import Block from '../../utils/Component';
import template from './chat-page.hbs?raw';
import './chat-page.scss';
import { chatsData } from './data';

export default class ChatPage extends Block {
  constructor() {
    super();

    this.lists.chatItems = chatsData.map((item) => {
      return new ChatItem({
        avatarSrc: item.avatar,
        name: item.name,
        lastMessage: item.lastMessage,
        unreadMessages: item.unreadMessages,
        time: item.time,
      });
    });

    this.children.profileLink = new Link({
      url: '#',
      text: 'Профиль',
      className: 'chat-page__profile-link',
    });

    this.children.searchInput = new Input({
      rowClassName: 'chat-page__input-row',
      name: 'search',
      type: 'search',
      placeholder: 'Поиск',
    });

    this.children.chatItemHeader = new ChatItem({
      name: 'Вадим',
    });

    this.children.chatUserSettingButton = new Button({
      className: 'chat__user-settings-btn',
      square: true,
      transparent: true,
      icon: icons.dotsVertical,
    });

    this.children.clipButton = new Button({
      square: true,
      transparent: true,
      icon: icons.clip,
    });

    this.children.inputMessage = new Input({
      className: 'chat__input',
      type: 'text',
      name: 'message',
      placeholder: 'Сообщение',
    });

    this.children.submitMessageButton = new Button({
      square: true,
      icon: icons.arrowBtn,
    });
  }

  render() {
    return template;
  }
}
