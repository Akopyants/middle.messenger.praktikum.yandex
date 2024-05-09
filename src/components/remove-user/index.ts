import Block from '../../utils/Block';
import template from './remove-user.hbs?raw';
import './remove-user.scss';

export interface InterfaceRemoveUser {
  login: string;
  id: number;
  events?: {
    click: (e: Event) => void;
  };
}

export default class RemoveUser extends Block {
  constructor(props: InterfaceRemoveUser) {
    super({ ...props });
  }

  render() {
    return template;
  }
}
