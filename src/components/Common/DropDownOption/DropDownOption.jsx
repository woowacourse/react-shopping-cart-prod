import * as Styled from './style';
import PropTypes from 'prop-types';

const DropDownOption = ({ hasUnderLine = true, onClick, children }) => {
  return (
    <Styled.Wrapper hasUnderLine={hasUnderLine} onClick={onClick}>
      {children}
    </Styled.Wrapper>
  );
};

DropDownOption.propTypes = {
  children: PropTypes.node,
  hasUnderLine: PropTypes.bool,
  onClick: PropTypes.func,
};

export default DropDownOption;
