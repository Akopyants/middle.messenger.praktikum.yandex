const getFormData = (form : HTMLFormElement) => {
    const formData = new FormData(form);

    formData.forEach((value, name) => {
        console.log(`${name} : ${value}`);
    });

}

export default getFormData;