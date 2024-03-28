import Block from '../../utils/Block';
import template from './link.hbs?raw';
import './link.scss';

interface InterfaceLink {
  url: string;
  className?: string;
  page?: string;
  text?: string;
  icon?: boolean;
  wrapper?: string;
}

export default class Link extends Block {
  constructor(props: InterfaceLink) {
    super({ ...props });
  }

  render() {
    return template;
  }
}
