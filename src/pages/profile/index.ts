import Block from '../../utils/Block';
import template from './profile.hbs?raw';
import './profile.scss';
import { profileUserData } from '../../pages/profile/data';
import Button from '../../components/button';
import userSettingsItem from '../../components/user-settings-item';
import getFormData from '../../utils/getFormData';
import isValidForm from '../../utils/isValidForm';
import userSettingsAvatar from '../../components/user-settings-avatar';
import icons from '../../assets/icons';
import Link from '../../components/link';
import store, { StoreEvents } from '../../utils/store';
import router from '../../router';

export default class Profile extends Block {
  constructor() {
    super();

    this.children.userSettingsAvatar = new userSettingsAvatar({
      name: 'Иван',
      icon: icons.avatarPreview,
    });

    const createUserSettingsItemList = () => {
      const user = store.getState().user

      Object.entries(user).forEach((element) => {
        if (profileUserData.hasOwnProperty(element[0])) {
          profileUserData[element[0]].value = element[1];
        }
      });
  
      this.lists.userSettingsItemList = Object.values(profileUserData).map((item) => {
        return new userSettingsItem({
          label: item.label,
          name: item.name,
          placeholder: item.label,
          value: item.value,
          type: item.type,
          disabled: true,
        });
      });
    }

    createUserSettingsItemList()

    const linksProps = [
      { text: 'Изменить данные', page: '/change-settings' },
      { text: 'Изменить пароль', page: '/change-password' },
      { text: 'Выйти', page: 'logout' },
    ];

    this.lists.profileLinks = linksProps.map((item) => {
      return new Link({
        url: '#',
        wrapper: 'li',
        ...item,
      });
    });

    this.children.saveButton = new Button({
      text: 'Сохранить',
      className: 'profile__save-btn',
      events: {
        click: (e: Event) => {
          this.submitForm(e);
        },
      },
    });

    this.children.backButton = new Button({
      text: 'Назад',
      className: 'profile__back-btn',
      events: {
        click: () => {
          router.back();
        }
      }
    });

    store.on(StoreEvents.Updated, () => {
      createUserSettingsItemList()
      console.log('store')

    });


  }

  submitForm(e: Event) {
    e.preventDefault();
    const form = this.element?.querySelector('form') as HTMLFormElement;

    if (form) {
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
