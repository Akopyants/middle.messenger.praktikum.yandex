import icons from '../../assets/icons';
import Button from '../../components/button';
import userSettingsAvatar from '../../components/user-settings-avatar';
import userSettingsItem from '../../components/user-settings-item';
import Block from '../../utils/Component';
import getFormData from '../../utils/getFormData';
import isValidForm from '../../utils/isValidForm';
import template from './change-password.hbs?raw';

export default class СhangePassword extends Block {
  constructor() {
    super();

    const signInInputListProps = [
      { label: 'Старый пароль', name: 'oldPassword', type: 'password', value: 'Closer227' },
      { label: 'Новый пароль', name: 'newPassword', type: 'password', value: 'Closer227' },
      { label: 'Новый пароль', name: 'newPasswordRepeat', type: 'password', placeholder: 'Пароль', value: 'Closer227' },
    ];

    this.lists.userSettingsItemList = signInInputListProps.map((inputProps) => {
      return new userSettingsItem({
        label: inputProps.label,
        name: inputProps.name,
        placeholder: inputProps.label,
        value: inputProps.value,
        type: inputProps.type,
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
