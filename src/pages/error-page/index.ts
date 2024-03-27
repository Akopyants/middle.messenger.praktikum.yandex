import ErrorItem from '../../components/error-item';
import Block from '../../utils/Component';
import template from './error-page.hbs?raw';

export default class ErrorPage extends Block {
  constructor(props: Record<string, any>) {
    super({
      ...props,
    });

    this.children.ErrorItem = new ErrorItem({
      code: '500',
      text: 'Мы уже фиксим',
    });
  }

  render() {
    return template;
  }
}
