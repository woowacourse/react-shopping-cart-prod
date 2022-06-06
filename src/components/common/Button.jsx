import styled, { css } from 'styled-components';
import { COLORS } from '../../styles/theme';

const Button = styled.button`
  width: 462px;
  height: 48px;
  margin: 14px 0;
  border-radius: 4px;
  border: none;
  font-size: 20px;
  font-weight: 600;
  background-color: ${COLORS.PRIMARY};
  color: ${COLORS.WHITE};

  &:hover {
    background-color: ${COLORS.LIGHT_PRIMARY};
  }

  ${(props) =>
    props.order &&
    css`
      width: 90%;
      height: 54px;
    `}
`;

export default Button;
