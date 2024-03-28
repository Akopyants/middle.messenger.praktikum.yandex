import Block from '../../utils/Block';
import template from './change-settings.hbs?raw';
import './change-settings.scss';
import { profileUserData } from '../../pages/profile/data';
import Button from '../../components/button';
import userSettingsItem from '../../components/user-settings-item';
import getFormData from '../../utils/getFormData';
import isValidForm from '../../utils/isValidForm';
import userSettingsAvatar from '../../components/user-settings-avatar';
import icons from '../../assets/icons';

export default class ChangeSettings extends Block {
  constructor() {
    super();

    this.children.userSettingsAvatar = new userSettingsAvatar({
      name: 'Иван',
      icon: icons.avatarPreview,
    });

    this.lists.userSettingsItemList = Object.values(profileUserData).map((item) => {
      return new userSettingsItem({
        label: item.label,
        name: item.name,
        placeholder: item.label,
        value: item.value,
        type: item.type,
        validate: true
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
