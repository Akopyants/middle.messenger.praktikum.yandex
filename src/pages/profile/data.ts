interface data {
  [key: string]: {
    name: string;
    label: string;
    value: string;
    type: string;
  };
}
export const profileUserData: data = {
  email: {
    name: 'email',
    label: 'Почта',
    value: 'pochta@yandex.ru',
    type: 'email',
  },
  login: {
    name: 'login',
    label: 'Логин',
    value: 'ivanivanov',
    type: 'text',
  },
  firstName: {
    name: 'first_name',
    label: 'Имя',
    value: 'Иван',
    type: 'text',
  },
  secondName: {
    name: 'second_name',
    label: 'Фамилия',
    value: '',
    type: 'text',
  },
  displayName: {
    name: 'display_name',
    label: 'Имя в чате',
    value: '',
    type: 'text',
  },
  phone: {
    name: 'phone',
    label: 'Телефон',
    value: '+7(909)9673030',
    type: 'tel',
  },
};
