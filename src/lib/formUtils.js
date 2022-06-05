const getFormData = ($form) => {
  const formData = new FormData($form).entries();
  return Object.fromEntries(formData);
};

export { getFormData };
