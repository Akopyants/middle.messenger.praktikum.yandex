import Block from '../../utils/Block';
import Link from '../link';
import Title from '../title';
import template from './error-item.hbs?raw';
import './error-item.scss';

interface InterfaceErrorItem {
  code: string;
  text: string;
}

export default class ErrorItem extends Block {
  constructor(props: InterfaceErrorItem) {
    super({ ...props });

    this.children.title = new Title({
      level: 1,
      className: 'error-item__title',
      text: props.code,
    });

    this.children.link = new Link({
      url: 'chat',
      text: 'Назад к чатам',
      className: 'error-item__link',
    });
  }

  render() {
    return template;
  }
}
