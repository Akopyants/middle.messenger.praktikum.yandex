// import './login-page.scss';
// export { default as LoginPage } from './login-page.hbs?raw';

import Component from '../../utils/Component';
import template from './login-page.hbs?raw';
import './login-page.scss';
// import data from './data';
// import Form from '../../components/form/index';

export default class LoginPage extends Component {
  constructor(props: Record<string, any>) {
    super('main', props);
    console.log(template)
    // const { image, form } = data;
    // this.props.image = image;
    this.props.attr = { class: 'login' };
    
    // this.children.form = new Form({
    //   name: 'form-login',
    //   title: 'Вход',
    //   fields: form.fields,
    //   buttons: form.buttons,
    //   link: { url: '/registration', text: 'Нет аккаунта?' },
    //   error: { text: '' },
    // });
  }

  render() {
    return this.compile(template, { ...this.props });
  }
}
