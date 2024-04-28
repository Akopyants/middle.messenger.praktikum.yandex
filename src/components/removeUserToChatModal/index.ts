import Block from '../../utils/Block';
import Button from '../button';
import Title from '../title';
import template from './removeUserToChatModal.hbs?raw';
import './removeUserToChatModal.scss';
import store, {StoreEvents} from '../../utils/store';
import RemoveUser from '../remove-user';
import { chatController } from '../../controllers/chatsControllers';

interface InterfaceModal {
  isOpen?: boolean;
}

export default class RemoveUserToChatModal extends Block {
  constructor(props: InterfaceModal) {
    super({ ...props });

    this.children.title = new Title({
      level: 4,
      className: 'modal__content-title',
      text: 'Удалить пользователя',
    });


    store.on(StoreEvents.Updated, () => {
      const users = store.getState().currentChatUsers;
      const userId = store.getState().user.id;
      const chatId = store.getState().currentChatId;

      console.log(store)
      this.lists.removeUsersList = users?.map((item) => {
        if (userId !== item.id) {
          const {login, id} = item;

          return new RemoveUser({
            login,
            id,
            events: {
              click: () => {
                if (id && chatId) {
                  chatController.deleteUsersFromChat(id, +chatId);
                }
              }
            }
          })
        }
        
        return ''
      })
    });

    this.children.closeModal = new Button({
      text: '',
      className: 'modal__content-close',
      events: {
        click: () => {
          this.setProps({
            isOpen: false,
          });
        },
      },
    });
  }

  render() {
    return template;
  }
}
