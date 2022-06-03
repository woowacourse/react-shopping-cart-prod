import * as Styled from './style';
import PropTypes from 'prop-types';
import { forwardRef } from 'react';

const Input = ({ description = '이메일', ...props }, ref) => {
  return (
    <Styled.Wrapper>
      <Styled.Description>{description}</Styled.Description>
      <Styled.Input ref={ref} {...props} />
    </Styled.Wrapper>
  );
};

Input.propTypes = {
  description: PropTypes.string,
  ref: PropTypes.shape({ current: PropTypes.instanceOf(Element) }),
};

export default forwardRef(Input);
