const getFormData = ($form) => {
<<<<<<< HEAD
  const formData = new FormData($form).entries();
  return Object.fromEntries(formData);
=======
  const formData = {};

  $form.querySelectorAll('input').forEach((target) => {
    formData[target.name] = target.value;
  });

  return formData;
>>>>>>> 68aa226472f257aae4442d058ba944e087c68854
};

export { getFormData };
