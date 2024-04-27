// import { chatController } from '../../controllers/chatsControllers';
import Block from '../../utils/Block';
// import isValidForm from '../../utils/isValidForm';
import Button from '../button';
// import Input from '../input';
import Title from '../title';
import template from './removeUserToChatModal.hbs?raw';
import './removeUserToChatModal.scss';
import store, {StoreEvents} from '../../utils/store';
import RemoveUser from '../remove-user';
import { chatController } from '../../controllers/chatsControllers';

interface InterfaceModal {
  isOpen?: boolean;
}

// type putUserData = {
//   users: number[];
//   chatId: number;
// };

export default class removeUserToChatModal extends Block {
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

    // this.children.addUserToChatInput = new Input({
    //   rowClassName: '',
    //   name: 'userId',
    //   errorMessages: '',
    //   type: 'text',
    //   value: '',
    //   placeholder: 'Id пользователя',
    //   validate: true,
    // });

    // this.children.addUserToChatButton = new Button({
    //   text: 'Добавить',
    //   className: 'modal__content-button',
    //   events: {
    //     click: (e: Event) => {
    //       this.submitForm(e);
    //     },
    //   },
    // });

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

  // submitForm(e: Event) {
    // e.preventDefault();
    // const form = this.element?.querySelector('form') as HTMLFormElement;

    // console.log('store', store);

    // if (isValidForm(form)) {
      // const inputValue = (this.children.addUserToChatInput as Input).getProps().value;

      // if (typeof inputValue === 'string') {
      //   const id = +inputValue;

      //   const data: putUserData = {
      //     users: [id],
      //     chatId: +store.getState().currentChatId,
      //   };

      //   chatController.addUserToChat(data);
      // }
    // }
  // }

  render() {
    return template;
  }
}
