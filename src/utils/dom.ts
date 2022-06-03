const createInputValueGetter =
  (formElement: HTMLFormControlsCollection) => (id: string) => {
    return (formElement.namedItem(id) as HTMLInputElement).value;
  };

export { createInputValueGetter };
