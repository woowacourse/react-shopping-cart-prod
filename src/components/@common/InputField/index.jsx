import PropTypes from 'prop-types';

import * as S from './styles';

function InputField({
  name,
  status,
  type,
  width,
  message,
  placeholder,
  defaultValue,
  value,
  isDisabled,
  onChange,
}) {
  return (
    <S.Container>
      <S.Input
        name={name}
        status={status}
        type={type}
        width={width}
        placeholder={placeholder}
        defaultValue={defaultValue}
        value={value}
        disabled={isDisabled}
        onChange={onChange}
      />

      <S.Message status={status}>{message}</S.Message>
    </S.Container>
  );
}

InputField.propTypes = {
  name: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['', 'default', 'success', 'danger']),
  type: PropTypes.oneOf(['text', 'password', 'email']).isRequired,
  width: PropTypes.string,
  isDisabled: PropTypes.bool,
  message: PropTypes.string,
};

InputField.defaultProps = { width: '100%', status: 'default', message: '', isDisabled: false };

export default InputField;
