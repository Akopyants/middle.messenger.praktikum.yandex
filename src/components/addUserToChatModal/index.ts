import { chatController } from '../../controllers/chatsControllers';
import Block from '../../utils/Block';
import isValidForm from '../../utils/isValidForm';
import Button from '../button';
import Input from '../input';
import Title from '../title';
import template from './addUserToChatModal.hbs?raw';
import './addUserToChatModal.scss';

interface InterfaceModal {
  isOpen?: boolean;
}

export default class addUserToChatModal extends Block {
  constructor(props: InterfaceModal) {
    super({ ...props });

    this.children.title = new Title({
      level: 4,
      className: 'modal__content-title',
      text: 'Добавить пользователя',
    });

    this.children.addUserToChatInput = new Input({
      rowClassName: '',
      name: 'userId',
      errorMessages: '',
      type: 'text',
      value: '123',
      placeholder: 'Id пользователя',
      validate: true,
    });

    this.children.addUserToChatButton = new Button({
      text: 'Добавить',
      className: 'modal__content-button',
      events: {
        click: (e: Event) => {
          this.submitForm(e);
        },
      },
    });

    this.children.closeModal = new Button({
      text: '',
      className: 'modal__content-close',
      events: {
        click: () => {
          this.setProps({
            isOpen: false
          })
        },
      },
    });
  }

  submitForm(e: Event) {
    e.preventDefault();
    const form = this.element?.querySelector('form') as HTMLFormElement;


    if (isValidForm(form)) {
      const inputValue = (this.children.addChatInput as Input).getProps().value;
      
      if (typeof inputValue === 'string') {
        chatController.create(inputValue);
      }
    }
  }

  render() {
    return template;
  }
}