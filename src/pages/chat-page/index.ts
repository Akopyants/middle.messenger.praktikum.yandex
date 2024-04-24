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
import template from './chat-page.hbs?raw';
import './chat-page.scss';
// Messages
// messageForm

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
        });
      });

      this.children.chatItemHeader = new chatHeader({
        title: 'Вадим',
        showAddUserButton: true,
        events: {
          click: (e: Event) => {
            const targetElement = e.target as HTMLElement;

            if (targetElement.tagName === 'BUTTON') {
              (this.children.addUserToChatModal as addUserToChatModal).setProps({
                isOpen: true,
              });
            }

            console.log(targetElement);

            // const targetElement = e.target as HTMLElement;
            // const chatItemElement = targetElement.closest('.chat-item') as HTMLElement | null;

            // if (chatItemElement) {
            //   const chatId = chatItemElement.dataset.id;
            //   console.log(chatId);

            //   console.log(store);
            // }
          },
        },
      });

      (this.children.chatItemHeader as ChatItem).setProps({ id: store.getState().currentChatId });

      const chatId = store.getState().currentChatId;

      if (chatId) {
        const allMessages = store.getState().messages;

        if (allMessages) {
          const currentChatMessages = allMessages[chatId]; 

          if (currentChatMessages && Array.isArray(currentChatMessages)) {
            this.lists.messages = currentChatMessages.map((item: messageInterface) => {
              const content = item.content ?? '';

              return new Messages({
                value: content,
              });
            });
          }
        }
      }
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

    this.children.messageForm = new messageForm({
      events: {
        submit: (e: Event) => {
          this.sendMessage(e);
        },
      },
    });
  }

  sendMessage(e: Event) {
    e.preventDefault();

    const target = e.target as HTMLElement;
    const input = target.querySelector('input') as HTMLInputElement | null; // Получаем элемент HTMLInputElement или null

    if (input) {
      const value = input.value;  

      chatController.ws.send(
        JSON.stringify({
          content: value,
          type: 'message',
        }),
      );

      input.value = '';
    }
  }

  render() {
    return template;
  }
}
