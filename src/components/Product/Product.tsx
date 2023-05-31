import { useEffect } from 'react';
import * as styled from './Product.styled';

import { Stepper } from '@components/common/Stepper/Stepper';

import { useCartItemValue } from '@recoils/recoilCart';
import { useApiBaseUrlValue } from '@recoils/recoilApiBaseUrl';
import { useSetCheckedState } from '@recoils/recoilChecked';

import { useMutation } from '@hooks/useMutation';
import { useUpdateRecoilCart } from '@hooks/useUpdateRecoilCart';

import { FETCH_METHOD, FETCH_URL } from '@constants/index';
import { CartAddIcon } from '@assets/svg';

import type { ProductType } from '../../types';

interface Props {
  item: ProductType;
}

export const Product = ({ item }: Props) => {
  const baseUrl = useApiBaseUrlValue();
  const { mutation: addCartMutation, data: addCartResponseData } = useMutation(FETCH_METHOD.POST);

  const { addRecoilCartItem } = useUpdateRecoilCart();

  const setCheckedState = useSetCheckedState();

  const cartItem = useCartItemValue(item.id);

  useEffect(() => {
    if (!addCartResponseData) return;

    const { cartItemId } = addCartResponseData;

    addRecoilCartItem(cartItemId, item);

    setCheckedState((prev) => ({
      ...prev,
      [cartItemId]: true,
    }));
  }, [addCartResponseData]);

  const onClickCartIcon = () => {
    addCartMutation(baseUrl + FETCH_URL.CART_ITEMS, {
      productId: item.id,
    });
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
