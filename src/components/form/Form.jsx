import React from "react";
import Button from "@/components/button/Button";

import StyledForm from "./Form.styled";

function Form({ buttonText, children }) {
  return (
    <StyledForm>
      {children}
      <Button
        type="submit"
        width="100%"
        height="30px"
        backgroundColor="#2AC1BC"
        text={buttonText}
        borderRadius="4px"
      />
    </StyledForm>
  );
}

export default Form;
