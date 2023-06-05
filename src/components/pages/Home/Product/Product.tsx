import { ErrorBoundary } from 'react-error-boundary';
import * as styled from './Product.styled';

import { Stepper } from '@components/common/Stepper/Stepper';
import { FallbackRender } from '@components/FallbackRender/FallbackRender';

import { useCartRepository, useFindCartItemByProductId } from '@recoils/cartAtoms';

import { CartAddIcon } from '@assets/svg';

import type { Product as ProductType } from '../../../../types';

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
            <ErrorBoundary fallbackRender={FallbackRender}>
              <Stepper cartItemId={cartItem.id} quantity={cartItem.quantity || 1} />
            </ErrorBoundary>
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
