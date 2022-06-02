import React from 'react';

import { Icon } from 'components/common';

import * as S from 'components/common/CheckBox/CheckBox.style';

function CheckBox({ checked = false, onClick = () => {} }) {
  return (
    <S.Container>
      <S.CustomCheckBox checked={checked} onClick={onClick}>
        {checked && <Icon iconName="CheckBox" size="15px" stroke="white" />}
      </S.CustomCheckBox>
    </S.Container>
  );
}

export default CheckBox;
