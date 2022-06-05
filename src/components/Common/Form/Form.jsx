import * as Styled from './style';
import PropTypes from 'prop-types';

const Form = ({ children, title, onSubmit }) => {
  return (
    <Styled.Form onSubmit={onSubmit}>
      <Styled.Title>{title}</Styled.Title>
      {children}
    </Styled.Form>
  );
};

Form.propTypes = {
  children: PropTypes.node,
  onSubmit: PropTypes.func,
  title: PropTypes.string,
};

export default Form;
