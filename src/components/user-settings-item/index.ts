import Block from '../../utils/Block';
import template from './user-settings-item.hbs?raw';
import './user-settings-item.scss';
import Input from '../input';
import validateInput from '../../utils/validation';

interface InterfaceuserSettingsItem {
  name: string;
  placeholder: string;
  type: string;
  value?: string;
  errorMessages?: string;
  label?: string;
  disabled?: boolean;
}

type childrenType = {
  [key: string]: Block | unknown;
};

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
      events: {
        blur: (e: Event) => {
          const errorMessage = validateInput(e.target as HTMLInputElement);
          const target = e.target as HTMLInputElement;
          const children = this.children as childrenType;
          const inputChild = children.input as Input;

          inputChild.setProps({
            value: target.value,
            valid: !errorMessage,
            errorMessages: errorMessage,
          });
        },
      },
    });
  }

  render() {
    return template;
  }
}
