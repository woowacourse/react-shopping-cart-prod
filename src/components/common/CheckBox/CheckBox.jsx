import React from 'react';

import * as S from 'components/common/CheckBox/CheckBox.style';

function CheckBox({ checked = false, onChange = () => {}, disabled }) {
  return (
    <S.Container>
      <S.CustomCheckBox
        type={'checkbox'}
        checked={checked}
        onChange={onChange}
        disabled={disabled}
      />
    </S.Container>
  );
}

export default CheckBox;
