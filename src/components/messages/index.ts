import Block from '../../utils/Block';
import template from './input.hbs?raw';
import './input.scss';

interface interfaceMessages {
  time?:string,
  value: string,
  isYourMessage?: boolean
}

export default class Messages extends Block {
  constructor(props: interfaceMessages) {
    super({
      ...props,
    });

  }

  render() {
    return template;
  }
}
