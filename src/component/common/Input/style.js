import {FlexColumn} from 'style/common';
import styled, {css} from 'styled-components';

const Layout = styled(FlexColumn)``;

const Input = styled.input`
  box-sizing: border-box;
  width: 300px;
  height: 36px;
  background: #ffffff;
  border: 1px solid #b4b4b4;
  border-radius: 4px;
  letter-spacing: 0.5px;
  padding: 10px;
  color: ${({theme}) => theme.BLACK};

  &::placeholder {
    color: ${({theme}) => theme.GRAY_700};
  }

  ${(props) =>
    props.size === 'small' &&
    css`
      width: 75px;
      height: 36px;
    `}

  ${(props) =>
    props.size === 'medium' &&
    css`
      width: 300px;
      height: 36px;
    `}

  ${(props) =>
    props.size === 'large' &&
    css`
      width: 456px;
      height: 50px;
    `}
`;

const Label = styled.label`
  margin-bottom: 4px;
`;

export {Input, Label, Layout};
