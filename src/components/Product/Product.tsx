import * as styled from './Product.styled';

import { CartAddIcon } from '../../assets/svg';

import { useCartItemValue } from '../../recoils/recoilCart';

import { Stepper } from '../common/Stepper/Stepper';
import { ProductType } from '../../types';
import { useMutation } from '../../hooks/useMutation';
import { FETCH_METHOD, FETCH_URL } from '../../constants';
import { useApiBaseUrlValue } from '../../recoils/recoilApiBaseUrl';
import { useEffect } from 'react';
import { useSetCheckedState } from '../../recoils/recoilChecked';
import { useUpdateRecoilCart } from '../../hooks/useUpdateRecoilCart';

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
