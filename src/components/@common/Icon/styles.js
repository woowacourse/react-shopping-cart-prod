import styled from '@emotion/styled';
import { COLORS } from 'styles/theme';

const Icon = styled.span`
  color: ${(props) => props.color || COLORS.BLACK};
  &::before {
    content: '\\${({ icon }) => icon}';
    font-family: 'Font Awesome 6 Free';
    font-style: normal;
    font-weight: 900;
  }
`;

export default Icon;
