const getFormData = ($form) => {
  const formData = {};

  $form.querySelectorAll('input').forEach((target) => {
    formData[target.name] = target.value;
  });

  return formData;
};

export { getFormData };
