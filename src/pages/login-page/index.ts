import Block from '../../utils/Block';
import template from './login-page.hbs?raw';
import './login-page.scss';
import Title from '../../components/title';
import Input from '../../components/input';
import Button from '../../components/button';
import Link from '../../components/link';
import findEmptyField from '../../utils/findEmptyField';
import getFormData from '../../utils/getFormData';
import isValidForm from '../../utils/isValidForm';
import AuthController from '../../controllers/authControllers';
// import store from '../../utils/store';

export default class LoginPage extends Block {
  constructor() {
    super();

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
      value: 'TTTTAkopyantsTTTT',
      validate: true,
    });

    this.children.inputPassword = new Input({
      rowClassName: 'login-form__input-row',
      name: 'password',
      type: 'password',
      placeholder: 'Пароль',
      valid: 'false',
      value: 'TestTest1234',
      validate: true,
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
      url: 'sign-in',
      text: 'Нет аккаунта?',
      className: 'sign-in-form__link',
      page: '/sign-up',
    });
  }

  submitForm(e: Event) {
    e.preventDefault();
    const form = this.element?.querySelector('form') as HTMLFormElement;

    if (form) {
      findEmptyField(form);
      getFormData(form);
    }

    if (isValidForm(form)) {
      AuthController.login(new FormData(form));
    }
  }

  render() {
    return template;
  }
}
