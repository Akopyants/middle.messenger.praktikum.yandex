import Component from '../../utils/Component';
import template from './title.hbs?raw';
import './title.scss';

interface InterfaceTitle {
  text?: string;
  level: number;
}

export default class Title extends Component {
  constructor(props: InterfaceTitle) {
    super(props);
  }

  render() {
    return `${template}`;
  }
}
