import React from 'react';

import { 아이콘_코드 } from 'constants/';
import { COLORS } from 'styles/theme';
import * as CommonStyled from 'components/@common/CommonStyle/styles';
import Icon from '../Icon/styles';

const childrenStyle = {
  margin: '0 0 0 0.5rem',
};

const ErrorMessage = ({ children }) => (
  <CommonStyled.FlexWrapper margin="0 0 1rem 0">
    <Icon icon={아이콘_코드.ALERT} color={COLORS.RED_100}>
      <span style={childrenStyle}>{children}</span>
    </Icon>
  </CommonStyled.FlexWrapper>
);

export default ErrorMessage;

ErrorMessage.defaultProps = {
  children: '예시 에러 메시지 입니다.',
};
