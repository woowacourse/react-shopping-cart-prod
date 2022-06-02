import React from 'react';
import * as S from 'components/common/Form/Form.style';
import { Button } from 'components/common';

function Form({ buttonText, onSubmit, children }) {
  return (
    <S.Form onSubmit={onSubmit}>
      {children}
      <Button type="submit">{buttonText}</Button>
    </S.Form>
  );
}

export default Form;
