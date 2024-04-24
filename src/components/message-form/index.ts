// import { chatController } from '../../controllers/chatsControllers';
// import authControllers from '../../controllers/authControllers';
import icons from '../../assets/icons';
// import { chatController } from '../../controllers/chatsControllers';
import Block from '../../utils/Block';
// import store from '../../utils/store';
import Button from '../button';
import Input from '../input';
// import store, {StoreEvents} from '../../utils/store';
import template from './message-form.hbs?raw';
import './message-form.scss';



interface chatsInterface {
  events?: {
    submit: (e: Event) => void;
  };
}

export default class messageForm extends Block {
  constructor(props: chatsInterface) {
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