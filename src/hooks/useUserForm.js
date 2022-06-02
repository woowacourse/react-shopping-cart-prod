function useUserForm(setForm) {
  const handleUserInfoChange = (key) => (e) => {
    setForm((prevState) => {
      return { ...prevState, [key]: e.target.value };
    });
  };

  return handleUserInfoChange;
}

export default useUserForm;
