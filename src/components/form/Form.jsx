import React from "react";
import Button from "@/components/button/Button";

import StyledForm from "@/components/form/Form.styled";

function Form({ buttonText, children, onSubmit, preventFormSubmit }) {
  return (
    <StyledForm onSubmit={onSubmit}>
      {children}
      <Button
        type="submit"
        width="100%"
        height="35px"
        backgroundColor="#2AC1BC"
        text={buttonText}
        borderRadius="4px"
        disabled={preventFormSubmit}
      />
    </StyledForm>
  );
}

export default Form;
