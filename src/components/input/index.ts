import Component from '../../utils/Component';
import validateInput from '../../utils/validation';
import template from './input.hbs?raw';
import './input.scss';

interface InterfaceInput {
  value?: string;
  className?: string;
  rowClassName?: string;
  name: string;
  type: string;
  error?: boolean;
  placeholder: string;
  disabled?: boolean;
  required?: boolean;
  errorMessages?: string;
  valid?: string;
  validate?: boolean;
  events?: {
    blur: (e: Event) => void;
  };
}

export default class Input extends Component {
  constructor(props: InterfaceInput) {
    super({
      ...props,
      events: {
        blur: (e: Event) => {
          console.log(this.props.validate)
          const errorMessage = validateInput(e.target as HTMLInputElement);
          const target = e.target as HTMLInputElement;

          this.setProps({
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
