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
    value: '',
    type: 'email',
  },
  login: {
    name: 'login',
    label: 'Логин',
    value: '',
    type: 'text',
  },
  first_name: {
    name: 'first_name',
    label: 'Имя',
    value: '',
    type: 'text',
  },
  second_name: {
    name: 'second_name',
    label: 'Фамилия',
    value: '',
    type: 'text',
  },
  display_name: {
    name: 'display_name',
    label: 'Имя в чате',
    value: '',
    type: 'text',
  },
  phone: {
    name: 'phone',
    label: 'Телефон',
    value: '',
    type: 'tel',
  },
};
