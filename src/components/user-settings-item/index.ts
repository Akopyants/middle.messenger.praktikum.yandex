import Block from '../../utils/Block';
import template from './user-settings-item.hbs?raw';
import './user-settings-item.scss';
import Input from '../input';

interface InterfaceuserSettingsItem {
  name: string;
  placeholder: string;
  type: string;
  value?: string;
  errorMessages?: string;
  label?: string;
  disabled?: boolean;
  validate?: boolean; 
}

export default class userSettingsItem extends Block {
  constructor(props: InterfaceuserSettingsItem) {
    super({ ...props });

    this.children.input = new Input({
      className: 'user-settings-item__input',
      name: props.name,
      placeholder: props.placeholder,
      type: props.type,
      value: props.value,
      errorMessages: props.errorMessages,
      disabled: props.disabled,
      validate: props.validate,
    });
  }

  render() {
    return template;
  }
}
