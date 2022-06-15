import Button from "@/components/Button";

import StyledForm from "@/components/Form/index.styled";

function Form({ buttonText, children, onSubmit, preventFormSubmit }) {
  return (
    <StyledForm onSubmit={onSubmit}>
      {children}
      <Button type="submit" disabled={preventFormSubmit}>
        {buttonText}
      </Button>
    </StyledForm>
  );
}

export default Form;
