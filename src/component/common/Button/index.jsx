import React from 'react';
import PropTypes from 'prop-types';

import * as S from 'component/common/Button/style';

export default function Button({children, type = 'button', onClick, isDisabled, ...rest}) {
  return (
    <S.ButtonLayout type={type} onClick={onClick} {...rest} disabled={isDisabled}>
      {children}
    </S.ButtonLayout>
  );
}

Button.propTypes = {
  children: PropTypes.oneOfType([PropTypes.string, PropTypes.element]),
  type: PropTypes.string,
  onClick: PropTypes.func,
  isDisabled: PropTypes.bool,
};
