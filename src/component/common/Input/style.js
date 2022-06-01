import {FlexColumn} from 'style/common';
import styled, {css} from 'styled-components';

const Layout = styled(FlexColumn)``;

const Input = styled.input`
  box-sizing: border-box;
  width: 300px;
  height: 36px;
  background: ${({theme}) => theme.WHITE};
  border: 1px solid ${({theme}) => theme.GRAY_650};
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
  
    ${(props) =>
    props.disabled &&
    css`
      background: ${({theme}) => theme.GRAY_500};
    `}
`;

const Label = styled.label`
  height: 16px;
  margin-bottom: 4px;
`;

const Message = styled.div`
  margin-top: 8px;
  color: ${({theme}) => theme.RED_500};
  line-height: 20px;
  font-size: 12px;
  max-width: 300px;
`;

export {Input, Label, Layout, Message};
