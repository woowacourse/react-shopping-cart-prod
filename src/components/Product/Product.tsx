import * as styled from './Product.styled';

import { Stepper } from '@components/common/Stepper/Stepper';

import { useCartRepository, useFindCartItemByProductId } from '@recoils/cartAtoms';

import { CartAddIcon } from '@assets/svg';

import type { Product as ProductType } from '../../types';

interface ProductProps {
  item: ProductType;
}

export const Product = ({ item }: ProductProps) => {
  const { addCartItem } = useCartRepository();

  const cartItem = useFindCartItemByProductId(item.id);

  const onClickCartIcon = () => {
    addCartItem({ productId: item.id });
  };

  return (
    <styled.Container>
      <styled.ProductImage path={item.imageUrl} />
      <styled.ProductInfo>
        <div>
          <styled.ProductName>{item.name}</styled.ProductName>
          <styled.ProductPrice>{item.price.toLocaleString('ko-KR')}원</styled.ProductPrice>
        </div>
        {cartItem ? (
          <styled.StepperWrapper>
            <Stepper cartItemId={cartItem.id} quantity={cartItem.quantity || 1} />
          </styled.StepperWrapper>
        ) : (
          <styled.CartIconWrapper onClick={onClickCartIcon}>
            <CartAddIcon />
          </styled.CartIconWrapper>
        )}
      </styled.ProductInfo>
    </styled.Container>
  );
};
