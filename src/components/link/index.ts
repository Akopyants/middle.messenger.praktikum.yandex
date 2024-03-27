import Component from '../../utils/Component';
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

export default class Link extends Component {
  constructor(props: InterfaceLink) {
    super({ ...props });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
