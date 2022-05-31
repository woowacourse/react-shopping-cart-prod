import * as Styled from './style';
import PropTypes from 'prop-types';

const DropDownOption = ({ hasUnderLine = true, children }) => {
  return (
    <Styled.Wrapper hasUnderLine={hasUnderLine}>{children}</Styled.Wrapper>
  );
};

DropDownOption.propTypes = {
  children: PropTypes.node,
  hasUnderLine: PropTypes.bool,
};

export default DropDownOption;
