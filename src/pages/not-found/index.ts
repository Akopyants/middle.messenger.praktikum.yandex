import ErrorItem from '../../components/error-item';
import Block from '../../utils/Component';
import template from './not-found.hbs?raw';
import './not-found.scss';

export default class NotFound extends Block {
  constructor(props: Record<string, any>) {
    super({
      ...props,
    });

    this.children.ErrorItem = new ErrorItem({
      code: '404',
      text: 'Не туда попали',
    });
  }

  render() {
    return template;
  }
}
