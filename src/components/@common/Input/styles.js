import styled from '@emotion/styled';
import { COLORS } from 'styles/theme';

const Input = styled.input`
  cursor: text;
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || '60px'};
  border: ${(props) => props.border || 'none'};
  margin: ${(props) => props.margin || '1rem 0'};
  padding: ${(props) => props.padding || '15px;'};
  font-size: ${(props) => props.size || '1.16rem'};
  border-radius: 4px;
  outline: none;
  &:focus {
    border-color: ${(props) => props.focusBorderColor || COLORS.MINT_200};
  }
`;

export default Input;
