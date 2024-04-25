import { chatController } from '../../controllers/chatsControllers';
import Block from '../../utils/Block';
import isValidForm from '../../utils/isValidForm';
import Button from '../button';
import Input from '../input';
import Title from '../title';
import template from './addChatModal.hbs?raw';
import './addChatModal.scss';

interface InterfaceModal {
  isOpen?: boolean;
}

export default class addChatModal extends Block {
  constructor(props: InterfaceModal) {
    super({ ...props });

    this.children.title = new Title({
      level: 4,
      className: 'modal__content-title',
      text: 'Добавить чат',
    });

    this.children.addChatInput = new Input({
      rowClassName: '',
      name: 'chatName',
      errorMessages: '',
      type: 'text',
      value: `Тестовый чат ${Math.floor(Math.random() * 1000)}`,
      placeholder: 'Название чата',
      validate: true,
    });

    this.children.addChatButton = new Button({
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

    console.log(this)

    this.setProps({
      isOpen: false
    })
  }

  render() {
    return template;
  }
}
