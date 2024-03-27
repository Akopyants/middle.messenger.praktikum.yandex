import Block from '../../utils/Component';
import template from './login-page.hbs?raw';
import './login-page.scss';
import Title from '../../components/title';
import Input from '../../components/input';
import Button from '../../components/button';
import Link from '../../components/link';
import validateInput from '../../utils/validation';
import findEmptyField from '../../utils/findEmptyField';
import getFormData from '../../utils/getFormData';

export default class LoginPage extends Block {
  constructor(props: Record<string, any>) {
    super({
      ...props,
    });

    this.children.title = new Title({
      text: 'Вход',
      level: 3,
    });

    this.children.inputLogin = new Input({
      rowClassName: '',
      name: 'login',
      type: 'text',
      required: true,
      placeholder: 'Логин',
      errorMessages: '',
      valid: 'false',
      events: {
        blur: this.handleInputBlur.bind(this, 'login'),
      },
    });

    this.children.inputPassword = new Input({
      rowClassName: 'login-form__input-row',
      name: 'password',
      type: 'password',
      placeholder: 'Пароль',
      valid: 'false',
      events: {
        blur: this.handleInputBlur.bind(this, 'password'),
      },
    });

    this.children.loginButton = new Button({
      text: 'Авторизоваться',
      page: 'choose-chat',
      type: 'submit',
      events: {
        click: (e: Event) => {
          this.submitForm(e);
        },
      },
    });

    this.children.regLink = new Link({
      url: '#',
      text: 'Нет аккаунта?',
      className: 'sign-in-form__link',
      page: 'sign-in',
    });
  }

  handleInputBlur(name: string, e: Event) {
    const errorMessage = validateInput(e.target as HTMLInputElement);
    const target = e.target as HTMLInputElement;

    const input = name === 'login' ? this.children.inputLogin : this.children.inputPassword;

    input.setProps({
      value: target.value,
      valid: !errorMessage,
      errorMessages: errorMessage,
    });
  }

  submitForm(e: Event) {
    e.preventDefault();
    const form = this.element?.querySelector('form') as HTMLFormElement;

    if (form) {
      findEmptyField(form);
      getFormData(form);
    }

    // if (isValidForm(form)) {
    //   alert()
    // }
  }

  render() {
    return template;
  }
}
