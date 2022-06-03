import * as Styled from './style';
import PropTypes from 'prop-types';

const ValidateText = ({ isValid, text = '' }) => {
  return (
    <Styled.Wrapper validType={isValid ? 'success' : 'error'}>
      {text}
    </Styled.Wrapper>
  );
};

ValidateText.propTypes = {
  isValid: PropTypes.bool,
  text: PropTypes.string,
};

export default ValidateText;
