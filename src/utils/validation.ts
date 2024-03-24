interface ValidationRules {
  login: {
    minLength: number;
    maxLength: number;
  },
  password: {
    minLength: number;
    maxLength: number;
  },
  disallowedPattern: RegExp;
  allowedPattern: RegExp;
  oneCapitalLetter: RegExp;
  requiresDigit: RegExp;
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
  disallowedPattern: /^\d+$/,
  allowedPattern: /^[a-zA-Z\d_-]+$/,
  oneCapitalLetter: /[A-Z]+/,
  requiresDigit: /\d/,
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

const validateInput = (event: Event): string => {
  const target = event.target as HTMLInputElement;
  const value = target.value;
  const name = target.name;

  if (name === 'login') {
    return validateLogin(value);
  }

  if (name === 'password') {
    return validatePassword(value);
  }

  return '';
};

export default validateInput;
