import Button from '../../components/button';
import Link from '../../components/link';
import Block from '../../utils/Block';
import Input from '../../components/input';
import template from './sign-in.hbs?raw';
import './sign-in.scss';
import Title from '../../components/title';
import findEmptyField from '../../utils/findEmptyField';
import getFormData from '../../utils/getFormData';
import isValidForm from '../../utils/isValidForm';

export default class SignIn extends Block {
  constructor() {
    super();

    this.children.title = new Title({
      text: 'Регистрация',
      level: 3,
    });
    const signInInputListProps = [
      { name: 'email', type: 'email', placeholder: 'Почта' },
      { name: 'login', type: 'text', placeholder: 'Логин' },
      { name: 'first_name', type: 'text', placeholder: 'Имя' },
      { name: 'second_name', type: 'text', placeholder: 'Фамилия' },
      { name: 'phone', type: 'tel', placeholder: 'Телефон' },
      { name: 'password', type: 'password', placeholder: 'Пароль' },
      { name: 'confirm_password', type: 'password', placeholder: 'Подтвердите пароль' },
    ];

    this.lists.signInInputList = signInInputListProps.map((inputProps) => {
      return new Input({
        rowClassName: 'sign-in-form__input-row',
        errorMessages: '',
        valid: 'false',
        validate: true,
        ...inputProps,
      });
    });

    this.children.signInButton = new Button({
      text: 'Зарегистрироваться',
      page: 'choose-chat',
      events: {
        click: (e: Event) => {
          this.submitForm(e);
        },
      },
    });

    this.children.signInLink = new Link({
      url: '#chat',
      text: 'Войти',
      className: 'login-form__link',
      page: 'sign-in',
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
      alert('submit');
    }
  }

  render() {
    return template;
  }
}
