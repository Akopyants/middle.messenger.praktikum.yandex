interface ValidationRules {
  login: {
    minLength: number;
    maxLength: number;
  };
  password: {
    minLength: number;
    maxLength: number;
  };
  chatName: {
    minLength: number;
  };
  disallowedPattern: RegExp;
  allowedPattern: RegExp;
  firstCapitalLetter: RegExp;
  oneCapitalLetter: RegExp;
  requiresDigit: RegExp;
  validEmail: RegExp;
  noNumber: RegExp;
  noSpace: RegExp;
  noSpecialSymbols: RegExp;
  phone: RegExp;
}

const validationRules: ValidationRules = {
  login: {
    minLength: 3,
    maxLength: 20,
  },
  password: {
    minLength: 8,
    maxLength: 40,
  },
  chatName: {
    minLength: 3
  },
  disallowedPattern: /^\d+$/,
  allowedPattern: /^[a-zA-Z\d_-]+$/,
  firstCapitalLetter: /^[A-ZА-Я]/,
  oneCapitalLetter: /[A-Z]/,
  requiresDigit: /\d/,
  validEmail: /^[^@\s]+@([^@\s]+\.)+[^@\s]{2,}$/i,
  noNumber: /^[^\d]*$/,
  noSpace: /^\S*$/,
  noSpecialSymbols: /^[A-ZА-Яa-zа-я-]+$/,
  phone: /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/,
};

const validateLogin = (value: string): string => {
  if (value.length < validationRules.login.minLength || value.length > validationRules.login.maxLength) {
    return `Длина логина должна быть от ${validationRules.login.minLength} до ${validationRules.login.maxLength} символов`;
  }

  if (!validationRules.allowedPattern.test(value)) {
    return 'Логин должен содержать только латинские буквы';
  }

  if (validationRules.disallowedPattern.test(value)) {
    return 'Логин не может состоять только из цифр';
  }

  return '';
};

const validatePassword = (value: string): string => {
  if (value.length < validationRules.password.minLength || value.length > validationRules.password.maxLength) {
    return `Длина пароля должна быть от ${validationRules.password.minLength} до ${validationRules.password.maxLength} символов`;
  }

  if (!validationRules.oneCapitalLetter.test(value)) {
    return 'Пароль должен содержать минимум одну заглавную букву';
  }

  if (!validationRules.requiresDigit.test(value)) {
    return 'Пароль должен содержать минимум одну цифру';
  }

  return '';
};

const validationEmail = (value: string): string => {
  if (!validationRules.validEmail.test(value)) {
    return 'Введите корректный email';
  }

  return '';
};

const validationName = (value: string): string => {
  if (!validationRules.firstCapitalLetter.test(value)) {
    return 'Первая буква должна быть заглавной';
  }

  if (!validationRules.noNumber.test(value)) {
    return 'Поле не может содержать число';
  }

  if (!validationRules.noSpace.test(value)) {
    return 'Поле не может содержать пробел';
  }

  if (!validationRules.noSpecialSymbols.test(value)) {
    return 'Поле не должно содержать спец символы';
  }

  return '';
};

const validationPhone = (value: string): string => {
  if (!validationRules.phone.test(value)) {
    return 'Введите корре́ктный номер телефона';
  }

  return '';
};

const validationChatName = (value: string) :string => {
  if (value.length < validationRules.chatName.minLength) {
    return `Название чата должно состоять миниммум из ${validationRules.chatName.minLength}`;
  }
  return ''
}

const validateInput = (target: HTMLInputElement): string => {
  const value = target.value;
  const name = target.name;

  if (name === 'login' || name === 'display_name') {
    return validateLogin(value);
  }

  if (name === 'password' || name === 'oldPassword' || name === 'newPassword' || name === 'newPasswordRepeat' || name === 'confirm_password') {
    return validatePassword(value);
  }

  if (name === 'email') {
    return validationEmail(value);
  }

  if (name === 'first_name' || name === 'second_name') {
    return validationName(value);
  }

  if (name === 'phone') {
    return validationPhone(value);
  }

  if (name === 'chatName') {
    return validationChatName(value);
  }

  return '';
};

export default validateInput;
