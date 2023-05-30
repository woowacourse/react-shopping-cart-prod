export const showInputErrorMessage = (
  isError: boolean,
  inputElement: HTMLInputElement | null,
  errorMessage: string
) => {
  if (!inputElement) return;

  if (!isError) {
    inputElement.setCustomValidity('');
    return;
  }

  inputElement.setCustomValidity(errorMessage);

  inputElement.reportValidity();
};
