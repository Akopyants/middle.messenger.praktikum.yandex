import Button from '../../components/button';
import Link from '../../components/link';
import Block from '../../utils/Component';
import Input from '../../components/input';
import template from './sign-in.hbs?raw';
import './sign-in.scss';
import Title from '../../components/title';
import validateInput from '../../utils/validation';
import findEmptyField from '../../utils/findEmptyField';
import getFormData from '../../utils/getFormData';
import isValidForm from '../../utils/isValidForm';

export default class SignIn extends Block {
  constructor(props: Record<string, any>) {
    super({
      ...props,
    });

    this.children.title = new Title({
      text: 'Регистрация',
      level: 3,
    });

    this.lists.signInInputList = [];

    const signInInputListProps = [
      { name: 'email', type: 'email', placeholder: 'Почта' },
      { name: 'login', type: 'text', placeholder: 'Логин' },
      { name: 'first_name', type: 'text', placeholder: 'Имя' },
      { name: 'second_name', type: 'text', placeholder: 'Фамилия' },
      { name: 'phone', type: 'tel', placeholder: 'Телефон' },
      { name: 'password', type: 'password', placeholder: 'Пароль' },
      { name: 'confirm_password', type: 'password', placeholder: 'Подтвердите пароль' },
    ];

    signInInputListProps.forEach((inputProps, index) => {
      const input = new Input({
        rowClassName: 'sign-in-form__input-row',
        errorMessages: '',
        valid: 'false',
        events: {
          blur: (e) => {
            const errorMessage = validateInput(e);
            const target = e.target as HTMLInputElement;

            this.lists.signInInputList[index].setProps({
              value: target.value,
              valid: !Boolean(errorMessage),
              errorMessages: errorMessage,
            });
          },
        },
        ...inputProps,
      });
      this.lists.signInInputList.push(input); // Add the input to the list
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
      url: '#',
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
      alert();
    }
  }

  render() {
    return template;
  }
}
