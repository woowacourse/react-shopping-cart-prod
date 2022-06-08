import PropTypes from 'prop-types';

import * as S from './styles';

function Button({ className, type, status, icon, width, isDisabled, onClick, children }) {
  const containerType = children ? 'BUTTON' : 'ICON';

  return (
    <S.Container
      className={className}
      type={type}
      status={status}
      icon={icon}
      width={width}
      disabled={isDisabled}
      containerType={containerType}
      onClick={onClick}
    >
      {children}
    </S.Container>
  );
}

Button.defaultProps = {
  className: '',
  type: 'button',
  status: 'default',
  icon: '',
  width: '100%',
  isDisabled: false,
  onClick: () => {},
};

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  status: PropTypes.oneOf(['default', 'primary', 'success', 'danger', 'info']),
  icon: PropTypes.string,
  width: PropTypes.string,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
