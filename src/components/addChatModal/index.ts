import { chatController } from '../../controllers/chatsControllers';
import Block from '../../utils/Block';
import Button from '../button';
import ModalForm from '../form';
import Title from '../title';
import template from './addChatModal.hbs?raw';
import './addChatModal.scss';

interface InterfaceModal {
  isOpen?: boolean;
}

export default class AddChatModal extends Block {
  constructor(props: InterfaceModal) {
    super({ ...props });

    this.children.title = new Title({
      level: 4,
      className: 'modal__content-title',
      text: 'Добавить чат',
    });

    this.children.modalForm = new ModalForm({
      inputType: 'text',
      inputValue: `Тестовый чат ${Math.floor(Math.random() * 1000)}`,
      inputPlaceholder: 'Название чата',
      buttonText: 'Добавить',
      events: {
        submit: this.addChatModalSubmit.bind(this),
      },
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

  addChatModalSubmit(e: Event) {
    e.preventDefault();

    const modalForm = this.children.modalForm as HTMLFormElement;

    if (modalForm) {
      const formData = new FormData(modalForm._element);
      const title = formData.get('chatName') as string;

      chatController.create(title);

      this.setProps({
        isOpen: false,
      });
    }


  }

  render() {
    return template;
  }
}
