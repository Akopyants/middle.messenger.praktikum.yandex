import Component from '../../utils/Component';
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
  disabled?: Boolean;
  blur: (e: Event) => void;
}

export default class userSettingsItem extends Component {
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
          props.blur(e);
        },
      },
    });
  }

  render() {
    return template;
  }
}
