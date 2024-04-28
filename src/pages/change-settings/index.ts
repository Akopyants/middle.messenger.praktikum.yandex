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
import store, { StoreEvents } from '../../utils/store';
import { settingsControllers } from '../../controllers/settingsControllers';
import router from '../../router';

export default class ChangeSettings extends Block {
  constructor() {
    super();

    this.children.userSettingsAvatar = new userSettingsAvatar({
      name: store.getState().user.login  || 'Введите имя',
      icon: icons.avatarPreview,
      avatar: store.getState().user.avatar,
      events: {
        click: () => {
          const input = document.querySelector('#file') as HTMLInputElement;

          if (input) {
            input.click();

            input.addEventListener('change', () => {
              const formData = new FormData();

              if (input.files && input.files.length > 0) {
                formData.append('avatar', input.files[0]);
                console.log(input.files[0]);
                settingsControllers.changeAvatar(formData);
              }
            });
          }
        },
      },
    });

    store.on(StoreEvents.Updated, () => {
      (this.children.userSettingsAvatar as userSettingsAvatar).setProps({
        avatar: store.getState().user.avatar,
      });
    });

    Object.entries(store.getState().user).forEach((element) => {
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
        validate: true,
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
      page: 'profile',
      text: 'Назад',
      className: 'profile__back-btn',
      events: {
        click: () => {
          router.back();
        },
      },
    });
  }

  async submitForm(e: Event) {
    e.preventDefault();
    const form = this.element?.querySelector('form') as HTMLFormElement;

    if (form) {
      getFormData(form);
    }

    if (isValidForm(form)) {
      settingsControllers.changeSettings(new FormData(form));
    }
  }

  render() {
    return template;
  }
}
