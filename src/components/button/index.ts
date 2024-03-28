import Block from '../../utils/Block';
import template from './button.hbs?raw';
import './button.scss';

interface InterfaceButton {
  className?: string;
  square?: boolean;
  transparent?: boolean;
  page?: string;
  text?: string;
  icon?: string;
  type?: string;
  events?: {
    click: (e: Event) => void;
  };
}

export default class Button extends Block {
  constructor(props: InterfaceButton) {
    super({ ...props });
  }

  render() {
    return template;
  }
}
