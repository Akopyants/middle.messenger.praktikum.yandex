import validateInput from './validation';

const checkValidityForm = (form: HTMLFormElement): boolean[] => {
  const fields: NodeListOf<HTMLInputElement> = form.querySelectorAll('input');
  const isValidArray: boolean[] = [];

  fields.forEach((field) => {
    isValidArray.push(!validateInput(field));
  });

  return isValidArray;
};

const isValidForm = (form: HTMLFormElement): boolean => {
  const isValidArray: boolean[] = checkValidityForm(form);

  for (let i = 0; i < isValidArray.length; i++) {
    if (!isValidArray[i]) {
      form.querySelectorAll('input')[i].focus();
      return false;
    }
  }

  return true;
};

export default isValidForm;
