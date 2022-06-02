import PropTypes from 'prop-types';

import * as S from './styles';

function Button({ className, type, status, icon, isDisabled, onClick, children }) {
  const containerType = children ? 'BUTTON' : 'ICON';

  return (
    <S.Container
      className={className}
      type={type}
      status={status}
      icon={icon}
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
  isDisabled: false,
  onClick: () => {},
};

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  status: PropTypes.oneOf(['default', 'primary', 'success', 'danger', 'info']),
  icon: PropTypes.string,
  isDisabled: PropTypes.bool,
  onClick: PropTypes.func,
};

export default Button;
