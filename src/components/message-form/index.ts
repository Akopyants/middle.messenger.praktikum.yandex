import icons from '../../assets/icons';
import Block from '../../utils/Block';
import Button from '../button';
import Input from '../input';
import template from './message-form.hbs?raw';
import './message-form.scss';

interface ChatsInterface {
  show?: boolean;
  events?: {
    submit: (e: Event) => void;
  };
}

export default class MessageForm extends Block {
  constructor(props: ChatsInterface) {
    super({
      ...props,
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
