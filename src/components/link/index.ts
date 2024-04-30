import Block from '../../utils/Block';
import router from '../../router';
import template from './link.hbs?raw';
import './link.scss';
import AuthController from '../../controllers/authControllers';


interface InterfaceLink {
  url: string;
  className?: string;
  page?: string;
  text?: string;
  icon?: boolean;
  wrapper?: string;
  events?: {
    click: (e: Event) => void;
  };
}

export default class Link extends Block {
  constructor(props: InterfaceLink) {
    super({ ...props,
      events: {
        click: (e: Event) => {
          e.preventDefault();
          
          if (props.page) {
            router.go(props.page)
          }

          if (props.page === 'logout') {
            AuthController.logout()
          }
        }
      }
     });
  }

  render() {
    return template;
  }
}
