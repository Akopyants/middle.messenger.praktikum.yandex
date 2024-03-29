import Block from '../../utils/Block';
import template from './title.hbs?raw';
import './title.scss';

interface InterfaceTitle {
  text?: string;
  level: number;
  className?: string;
}

export default class Title extends Block {
  constructor(props: InterfaceTitle) {
    super(props);
  }

  render() {
    return template;
  }
}
