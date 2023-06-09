import { MouseEventHandler } from 'react';

import { BiCartAdd } from 'react-icons/bi';
import { styled } from 'styled-components';

type Props = {
  ariaLabel: number;
  onClick: MouseEventHandler<SVGSVGElement>;
};

export const CartIconButton = ({ ariaLabel, onClick }: Props) => {
  return (
    <S.IconButton aria-label={`add-to-cart-${ariaLabel}`}>
      <BiCartAdd size={40} color="white" onClick={onClick} />
    </S.IconButton>
  );
};
const S = {
  IconButton: styled.button`
    width: 55px;
    height: 55px;
    border-radius: 50%;
    padding: 8px;
    background-color: var(--mint-color);
  `,
};

export default CartIconButton;
