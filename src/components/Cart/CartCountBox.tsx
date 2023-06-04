import styled from 'styled-components';

import useCartProductCount from '../../hooks/useCartProductCount';

const CartCountBox = () => {
  const cartProductCount = useCartProductCount();

  return <ProductCountAlert>{cartProductCount}</ProductCountAlert>;
};

const ProductCountAlert = styled.span`
  position: absolute;
  top: -4px;
  right: -2px;
  width: 16px;
  height: 16px;
  padding: 0 0 0 0.3px;
  font-size: 10px;
  text-align: center;
  border-radius: 50%;
  background-color: ${({ theme }) => theme.colors.primary};
  line-height: 16px;
`;

export default CartCountBox;
