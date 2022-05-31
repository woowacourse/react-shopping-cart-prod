import React from 'react';
import * as Styled from 'components/common/Form/Form.style';
import { Button } from 'components/common';

function Form({ buttonText, onSubmit, children }) {
  return (
    <Styled.Form onSubmit={onSubmit}>
      {children}
      <Button type="submit">{buttonText}</Button>
    </Styled.Form>
  );
}

export default Form;
