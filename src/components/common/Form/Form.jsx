import React, { useState } from 'react';

import { Button } from 'components/common';
import * as S from 'components/common/Form/Form.style';

function Form({ buttonText, onSubmit, children }) {
  const [submitting, setSubmitting] = useState(false);

  const handleSubmitClick = async (e) => {
    try {
      setSubmitting(true);
      await onSubmit(e);
    } catch ({ message }) {
      alert(message);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <S.Form onSubmit={handleSubmitClick}>
      {children}
      <Button type="submit" disabled={submitting}>
        {buttonText}
      </Button>
    </S.Form>
  );
}

export default Form;
