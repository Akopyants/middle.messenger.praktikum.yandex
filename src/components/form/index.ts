import Block from '../../utils/Block';
import Button from '../button';
import Input from '../input';
import template from './form.hbs?raw';
import './form.scss';

interface InterfaceFrom {
  inputType: string,
  inputValue?: string,
  inputPlaceholder?: string,
  buttonText?: string,
  events?: {
    submit?: (e: Event) => void;
  };
}

export default class ModalForm extends Block {
  constructor(props: InterfaceFrom) {
    super({
      ...props,
    });


    this.children.addChatInput = new Input({
      rowClassName: '',
      name: 'chatName',
      errorMessages: '',
      type: props.inputType,
      value: props.inputValue,
      placeholder: props.inputPlaceholder,
    });


    this.children.addChatButton = new Button({
      text: props.buttonText,
      className: 'modal__content-button',
    });
  }

  render() {
    return template;
  }
}
