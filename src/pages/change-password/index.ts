import icons from '../../assets/icons';
import Button from '../../components/button';
import userSettingsAvatar from '../../components/user-settings-avatar';
import userSettingsItem from '../../components/user-settings-item';
import { settingsControllers } from '../../controllers/settingsControllers';
import router from '../../router';
import Block from '../../utils/Block';
import isValidForm from '../../utils/isValidForm';
import template from './change-password.hbs?raw';

export default class СhangePassword extends Block {
  constructor() {
    super();

    const signInInputListProps = [
      { label: 'Старый пароль', name: 'oldPassword', type: 'password', value: '' },
      { label: 'Новый пароль', name: 'newPassword', type: 'password', value: '' },
    ];

    this.lists.userSettingsItemList = signInInputListProps.map((inputProps) => {
      return new userSettingsItem({
        label: inputProps.label,
        name: inputProps.name,
        placeholder: inputProps.label,
        value: inputProps.value,
        type: inputProps.type,
        validate: true,
      });
    });

    this.children.userSettingsAvatar = new userSettingsAvatar({
      name: 'Иван',
      icon: icons.avatarPreview,
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
        }
      }
    });
  }

  submitForm(e: Event) {
    e.preventDefault();
    const form = this.element?.querySelector('form') as HTMLFormElement;

    if (isValidForm(form)) {
      settingsControllers.changePassword(new FormData(form));
    }
  }

  render() {
    return template;
  }
}
