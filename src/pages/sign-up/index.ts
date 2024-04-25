import Button from '../../components/button';
import Link from '../../components/link';
import Block from '../../utils/Block';
import Input from '../../components/input';
import template from './sign-up.hbs?raw';
import './sign-up.scss';
import Title from '../../components/title';
import findEmptyField from '../../utils/findEmptyField';
import AuthController  from '../../controllers/authControllers';

export default class SignUp extends Block {
  constructor() {
    super();

    this.children.title = new Title({
      text: 'Регистрация',
      level: 3,
    });
    
    const SignUpInputListProps = [
      { name: 'email', type: 'email', placeholder: 'Почта', value: 'Test@m.ru' },
      { name: 'login', type: 'text', placeholder: 'Логин', value: 'TestAkopyants' },
      { name: 'first_name', type: 'text', placeholder: 'Имя', value: 'Sergey' },
      { name: 'second_name', type: 'text', placeholder: 'Фамилия', value: 'Akopyants' },
      { name: 'phone', type: 'tel', placeholder: 'Телефон', value: '89521231212' },
      { name: 'password', type: 'password', placeholder: 'Пароль',  value: 'TestTest123'},
    ];

    this.lists.SignUpInputList = SignUpInputListProps.map((inputProps) => {
      return new Input({
        rowClassName: 'sign-in-form__input-row',
        errorMessages: '',
        valid: 'false',
        validate: true,
        ...inputProps,
      });
    });

    this.children.SignUpButton = new Button({
      text: 'Зарегистрироваться',
      page: 'choose-chat',
      events: {
        click: (e: Event) => {          
          this.submitForm(e);
        },
      },
    });

    this.children.SignUpLink = new Link({
      url: 'login',
      text: 'Войти',
      className: 'login-form__link',
      page: '/login',
    });
  }

  submitForm(e: Event) {
    e.preventDefault();
    const form = this.element?.querySelector('form') as HTMLFormElement;

    if (form) {
      findEmptyField(form);
    }

    const formData = new FormData(form)
    AuthController.registration(formData)
  }

  render() {
    return template;
  }
}
