import styled from 'styled-components';
import { Theme } from '../../types';

type Props = {
  color?: keyof Theme['colors'];
  thickness?: 'thin' | 'think';
  theme: Theme;
};

const DivideLine = styled.hr<Props>`
  width: 100%;
  box-sizing: border-box;
  border-style: solid;

  border-color: ${({ color, theme: { colors } }) =>
    color ? colors[color] : colors['black']};
  border-width: ${({ thickness }) => (thickness === 'thin' ? '1px' : '2px')};
`;

export default DivideLine;
