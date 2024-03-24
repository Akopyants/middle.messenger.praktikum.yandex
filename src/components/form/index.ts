import Component from '../../utils/Component';
import template from './form.hbs?raw';
import './form.scss';

interface InterfaceForm {
  className: string
}

export default class Form extends Component {
  constructor(props: InterfaceForm) {
    super({...props});
  }

  render() {
    return template;
  }
}
