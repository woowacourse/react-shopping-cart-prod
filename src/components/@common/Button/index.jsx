import PropTypes from 'prop-types';

import * as S from './styles';

function Button({ className, type, status, icon, onClick, children }) {
  const containerType = children ? 'BUTTON' : 'ICON';

  return (
    <S.Container
      className={className}
      type={type}
      status={status}
      icon={icon}
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
  onClick: () => {},
};

Button.propTypes = {
  className: PropTypes.string,
  type: PropTypes.string,
  status: PropTypes.oneOf(['default', 'primary', 'success', 'danger', 'info']),
  icon: PropTypes.string,
  onClick: PropTypes.func,
};

export default Button;
