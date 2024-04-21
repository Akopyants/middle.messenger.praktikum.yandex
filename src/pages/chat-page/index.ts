import icons from '../../assets/icons';
import addChatModal from '../../components/addChatModal';
import Button from '../../components/button';
import ChatItem from '../../components/chat-item';
import Input from '../../components/input';
import Link from '../../components/link';
import { chatController } from '../../controllers/chatsControllers';
import Block from '../../utils/Block';
import store, {StoreEvents} from '../../utils/store';
import template from './chat-page.hbs?raw';
import './chat-page.scss';
// import { chatsData } from './data';

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


      this.children.chatItemHeader = new ChatItem({
        title: 'Вадим',
        showAddUserButton: true,
      });

      (this.children.chatItemHeader as ChatItem).setProps({'id': store.getState().currentChatId});


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


    this.children.addChatModal = new addChatModal({
      isOpen: false
    })
  
    this.children.buttonOpenModalAddChat = new Button({
      className: 'button-add-chat-modal',
      square: true,
      icon: icons.plus,
      events: {
        click: () => {
          (this.children.addChatModal as addChatModal).setProps({
            isOpen: true
          })
        }
      }
    })

  }

  render() {
    return template;
  }
}
