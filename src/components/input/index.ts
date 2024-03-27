import Component from '../../utils/Component';
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
  events?: {
    blur: (e: Event) => void;
  };
}

export default class Input extends Component {
  constructor(props: InterfaceInput) {
    super({ ...props });
  }

  render() {
    return template;
  }
}
