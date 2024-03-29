import ErrorItem from '../../components/error-item';
import Block from '../../utils/Block';
import template from './error-page.hbs?raw';

export default class ErrorPage extends Block {
  constructor() {
    super();
    
    this.children.ErrorItem = new ErrorItem({
      code: '500',
      text: 'Мы уже фиксим',
    });
  }

  render() {
    return template;
  }
}
