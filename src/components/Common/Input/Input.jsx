import * as Styled from './style';
import PropTypes from 'prop-types';

const Input = ({
  description = '이메일',
  placeholder = '이메일을 입력해주세요.',
  ...props
}) => {
  return (
    <Styled.Wrapper>
      <Styled.Description>{description}</Styled.Description>
      <Styled.Input placeholder={placeholder} {...props} />
    </Styled.Wrapper>
  );
};

Input.propTypes = {
  description: PropTypes.string,
  placeholder: PropTypes.string,
};

export default Input;
