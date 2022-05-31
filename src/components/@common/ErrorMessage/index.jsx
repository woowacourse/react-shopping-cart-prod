import React from 'react';

import { 아이콘_코드 } from 'constants/';
import { COLORS } from 'styles/theme';
import Icon from '../Icon/styles';

const childrenStyle = {
  margin: '0 0 0 0.5rem',
};

const ErrorMessage = ({ children }) => (
  <div>
    <Icon icon={아이콘_코드.ALERT} color={COLORS.RED_100}>
      <span style={childrenStyle}>{children}</span>
    </Icon>
  </div>
);

export default ErrorMessage;

ErrorMessage.defaultProps = {
  children: '예시 에러 메시지 입니다.',
};
