import icons from '../../assets/icons';
import addChatModal from '../../components/addChatModal';
import addUserToChatModal from '../../components/addUserToChatModal';
import Button from '../../components/button';
import chatHeader from '../../components/chat-header';
import ChatItem from '../../components/chat-item';
import Input from '../../components/input';
import Link from '../../components/link';
import messageForm from '../../components/message-form';
import Messages from '../../components/messages';
import { chatController } from '../../controllers/chatsControllers';
import Block from '../../utils/Block';
import store, { StoreEvents } from '../../utils/store';
import getTime from '../../utils/time';
import template from './chat-page.hbs?raw';
import './chat-page.scss';

interface messageInterface {
  chat_id?: number;
  content?: string;
  file?: null;
  id?: number;
  is_read?: boolean;
  time?: string;
  type?: string;
  user_id?: number;
}

export default class ChatPage extends Block {
  constructor() {
    super();

    chatController.getChats();

    store.on(StoreEvents.Updated, () => {
      this.lists.chatItems = store.getState().chats.map((item) => {
        return new ChatItem({
          id: item.id,
          avatar: item.avatar,
          title: item.title,
          showAddUserButton: false,
          lastMessage: item.last_message?.content,
          lastMessageLogin: item.last_message?.user?.login,
          unreadCount: item.unread_count,
        });
      });

      const currentChatId = store.getState().currentChatId;
      const currentChat = store.getState().chats.find((item) => item.id === +currentChatId);

      this.children.chatItemHeader = new chatHeader({
        title: currentChat?.title,
        showAddUserButton: true,
        show: Boolean(store.getState().currentChatId),
        events: {
          click: (e: Event) => {
            const targetElement = e.target as HTMLElement;

            if (targetElement.tagName === 'BUTTON') {
              (this.children.addUserToChatModal as addUserToChatModal).setProps({
                isOpen: true,
              });
            }

          },
        },
      });

      (this.children.chatItemHeader as ChatItem).setProps({ id: store.getState().currentChatId });

      const chatId = store.getState().currentChatId;

      const allMessages = store.getState().messages;

      if (allMessages) {
        const currentChatMessages = allMessages[chatId];

        if (currentChatMessages && Array.isArray(currentChatMessages)) {
          this.lists.messages = currentChatMessages.map((item: messageInterface) => {
            const content = item.content ?? '';
            const id = item.user_id;
            const time = item.time ?? '';

            return new Messages({
              time: getTime(time),
              value: content,
              isYourMessage: id === store.getState().user.id,
            });
          });
        }
      }
      this.children.messageForm = new messageForm({
        show: Boolean(store.getState().currentChatId),
        events: {
          submit: (e: Event) => {
            this.sendMessage(e);
          },
        },
      });
    });

    this.children.profileLink = new Link({
      url: '#',
      page: '/profile',
      text: 'Профиль',
      className: 'chat-page__profile-link',
    });

    this.children.searchInput = new Input({
      rowClassName: 'chat-page__input-row',
      name: 'search',
      type: 'search',
      placeholder: 'Поиск',
    });

    this.children.chatUserSettingButton = new Button({
      className: 'chat__user-settings-btn',
      square: true,
      transparent: true,
      icon: icons.dotsVertical,
    });

    this.children.addChatModal = new addChatModal({
      isOpen: false,
    });

    this.children.addUserToChatModal = new addUserToChatModal({
      isOpen: false,
    });

    this.children.buttonOpenModalAddChat = new Button({
      className: 'button-add-chat-modal',
      square: true,
      icon: icons.plus,
      events: {
        click: () => {
          (this.children.addChatModal as addChatModal).setProps({
            isOpen: true,
          });
        },
      },
    });
  }

  sendMessage(e: Event) {
    e.preventDefault();

    const target = e.target as HTMLElement;
    const input = target.querySelector('.chat__footer input') as HTMLInputElement | null; // Получаем элемент HTMLInputElement или null

    if (input) {
      const value = input.value;

      if (0 < value.length) {
        chatController.ws.send(
          JSON.stringify({
            content: value,
            type: 'message',
          }),
        );

        input.value = '';
      }
    }
  }

  render() {
    return template;
  }
}
