export const update = (element, formdata, formName) => {
  const newFormData = {
    ...formdata
  };
  const newElement = {
    ...newFormData[element.id]
  };

  newElement.value = element.event.target.value;

  if (element.blur) {
    let validData = validate(newElement, formdata);
    newElement.valid = validData[0];
    newElement.validationMessage = validData[1];
  }

  newElement.touched = element.blur;
  newFormData[element.id] = newElement;

  return newFormData;
};

export const validate = (element, formData = []) => {
  let error = [true, ''];

  if (element.validation.email) {
    const valid = /\S+@\S+\.\S+/.test(element.value);
    const message = `${!valid ? 'Must be a valid email' : ''}`;
    error = !valid ? [valid, message] : error;
  }

  if (element.validation.confirm) {
    const valid =
      element.value.trim() === formData[element.validation.confirm].value;
    const message = `${!valid ? 'Password Do not match' : ''}`;
    error = !valid ? [valid, message] : error;
  }
  if (element.validation.required) {
    const valid = element.value.trim() !== '';
    const message = `${!valid ? 'This field is required' : ''}`;
    error = !valid ? [valid, message] : error;
  }

  return error;
};

export const generateData = (formData, formName) => {
  let dataToSubmit = {};

  for (let key in formData) {
    if (key !== 'confirmPassword') dataToSubmit[key] = formData[key].value;
  }

  return dataToSubmit;
};

export const isFormValid = (formData, formName) => {
  let formIsValid = true;

  for (let key in formData) {
    formIsValid = formData[key].valid && formIsValid;
  }

  return formIsValid;
};

export const resetFields = (formData, formName) => {
  const newFormData = { ...formData };
  for (let key in newFormData) {
    if (key === 'images') {
      newFormData[key].value = [];
    } else {
      newFormData[key].value = '';
    }
    newFormData[key].value = '';
    newFormData[key].valid = false;
    newFormData[key].validationMessage = '';
  }

  return newFormData;
};

export const populateOptionFields = (formdata, arrayData = [], field) => {
  const newArray = [];
  const newFormData = { ...formdata };

  arrayData.forEach(item => {
    newArray.push({ key: item._id, value: item.name });
  });

  newFormData[field].config.options = newArray;

  return newFormData;
};

export const populateFields = (formData, fields) => {
  for (let key in formData) {
    formData[key].value = fields[key];
    formData[key].valid = true;
    formData[key].touched = true;
    formData[key].validationMessage = '';
  }

  return formData;
};
