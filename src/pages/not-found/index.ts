import ErrorItem from '../../components/error-item';
import Block from '../../utils/Block';
import template from './not-found.hbs?raw';
import './not-found.scss';

export default class NotFound extends Block {
  constructor() {
    super();

    this.children.ErrorItem = new ErrorItem({
      code: '404',
      text: 'Не туда попали',
    });
  }

  render() {
    return template;
  }
}
