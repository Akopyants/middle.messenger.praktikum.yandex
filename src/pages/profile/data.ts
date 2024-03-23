interface data {
  [key: string] : {
    name: string,
    label: string,
    value: string,
  }
}
export const profileUserData : data = {
  email: {
    name: 'email',
    label: 'Почта',
    value: 'pochta@yandex.ru',
  },
  login: {
    name: 'login',
    label: 'Логин',
    value: 'ivanivanov',
  },
  firstName: {
    name: 'first_name',
    label: 'Имя',
    value: 'Иван',
  },
  secondName: {
    name: 'second_name',
    label: 'Фамилия',
    value: 'Иванов',
  },
  displayName: {
    name: 'display_name',
    label: 'Имя в чате',
    value: 'Иван',
  },
  phone: {
    name: 'phone',
    label: 'Телефон',
    value: '+7(909)9673030',
  },
};
