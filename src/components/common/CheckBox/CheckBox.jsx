import React from 'react';

import { Icon } from 'components/common';
import * as S from 'components/common/CheckBox/CheckBox.style';

function CheckBox({ checked = false, disabled = false, onClick = () => {} }) {
  const handleOnClick = () => {
    if (!disabled) {
      onClick();
    }
  }
  
  return (
    <S.Container>
      <S.CustomCheckBox checked={checked} disabled={disabled} onClick={handleOnClick}>
        {checked && <Icon iconName="CheckBox" size="15px" stroke="white" />}
      </S.CustomCheckBox>
    </S.Container>
  );
}

export default CheckBox;
