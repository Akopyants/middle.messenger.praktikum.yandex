const isValidForm = (form: HTMLFormElement) => {
    const fields: NodeList = form.querySelectorAll('input');
  
    for (let i = 0; i < fields.length; i++) {
      const field = fields[i] as HTMLInputElement;
  
      const isValid = field.dataset.valid === 'true';
      if (!isValid) {
        return false;
      }
    }

    return true
  };
  
  export default isValidForm;
  