import styled from '@emotion/styled';
import { COLORS } from 'styles/theme';

const Button = styled.button`
  cursor: ${(props) => props.cursor || 'pointer'};
  width: ${(props) => props.width || '100%'};
  height: ${(props) => props.height || '60px'};
  margin: ${(props) => props.margin || '2rem 0'};
  background-color: ${(props) => props.backgroundColor || COLORS.BROWN_200};
  color: ${(props) => props.color || COLORS.WHITE};
  font-weight: ${(props) => props.weight || 'bold'};
  font-size: ${(props) => props.size || '1.16rem'};
  border: ${(props) => props.border || 'none'};

  &:hover {
    background-color: ${(props) => props.hoverColor || COLORS.BROWN_100};
    color: ${(props) => props.hoverFontColor || COLORS.WHITE};
  }

  &:disabled {
    cursor: not-allowed;
    background-color: ${COLORS.GRAY_100};
    color: ${COLORS.GRAY_300};
  }
`;

export default Button;
