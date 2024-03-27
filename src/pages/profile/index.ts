import Block from '../../utils/Component';
import template from './profile.hbs?raw';
import './profile.scss';
import { profileUserData } from '../../pages/profile/data';
import Button from '../../components/button';
import userSettingsItem from '../../components/user-settings-item';
import validateInput from '../../utils/validation';
import getFormData from '../../utils/getFormData';
import isValidForm from '../../utils/isValidForm';
import userSettingsAvatar from '../../components/user-settings-avatar';
import icons from '../../assets/icons';
import Link from '../../components/link';

export default class Profile extends Block {
  constructor(props: Record<string, any>) {
    super({
      ...props,
    });

    this.children.userSettingsAvatar = new userSettingsAvatar({
      name: 'Иван',
      icon: icons.avatarPreview,
    });

    this.lists.userSettingsItemList = [];

    Object.values(profileUserData).map((item, index) => {
      const userSettingsItemInstance = new userSettingsItem({
        label: item.label,
        name: item.name,
        placeholder: item.label,
        value: item.value,
        type: item.type,
        disabled: true,
        blur: (e) => {
          const errorMessage = validateInput(e.target as HTMLInputElement);
          const target = e.target as HTMLInputElement;

          this.lists.userSettingsItemList[index].children.input.setProps({
            value: target.value,
            valid: !errorMessage,
            errorMessages: errorMessage,
          });
        },
      });

      this.lists.userSettingsItemList.push(userSettingsItemInstance);
    });

    this.lists.profileLinks = [];

    const linksProps = [{ text: 'Изменить данные' }, { text: 'Изменить пароль' }, { text: 'Выйти' }];

    linksProps.forEach((item) => {
      const link = new Link({
        url: '#',
        text: item.text,
        wrapper: 'li',
      });

      this.lists.profileLinks.push(link);
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
