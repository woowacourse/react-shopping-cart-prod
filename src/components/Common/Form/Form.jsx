import * as Styled from './style';
import PropTypes from 'prop-types';

const Form = ({ children, onSubmit }) => {
  return <Styled.Form onSubmit={onSubmit}>{children}</Styled.Form>;
};

Form.propTypes = {
  children: PropTypes.node,
  onSubmit: PropTypes.func,
};

export default Form;
