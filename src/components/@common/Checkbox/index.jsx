import PropTypes from 'prop-types';
import { useState } from 'react';

import * as S from './styles';

function Checkbox({ name, size, checked, onChange, children }) {
  const [isChecked, setChecked] = useState(false);

  const onClickCheckbox = () => {
    if (checked !== null) {
      return;
    }

    setChecked(!isChecked);
  };

  return (
    <S.Container size={size} checked={checked || isChecked}>
      <S.Check
        type="checkbox"
        name={name}
        checked={checked || isChecked}
        onClick={onClickCheckbox}
        onChange={onChange}
      />
      {children && <S.Text>{children}</S.Text>}
    </S.Container>
  );
}

Checkbox.defaultProps = {
  checked: null,
  size: 'medium',
  onChange: () => {},
};

Checkbox.propTypes = {
  checked: PropTypes.oneOf([PropTypes.bool, null]),
  size: PropTypes.oneOfType([PropTypes.oneOf(['large', 'medium', 'small']), PropTypes.number]),
  onChange: PropTypes.func,
};

export default Checkbox;
