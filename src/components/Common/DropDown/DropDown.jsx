import * as Styled from './style';
import PropTypes from 'prop-types';

const DropDown = ({ children }) => {
  return <Styled.Wrapper>{children}</Styled.Wrapper>;
};

DropDown.propTypes = {
  children: PropTypes.node,
};

export default DropDown;
