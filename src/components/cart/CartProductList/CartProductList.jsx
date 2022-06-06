import React, { useEffect } from 'react';

import useCart from 'hooks/useCart';

import { CheckBox, ErrorContainer } from 'components/common';

import { CartProductCard } from 'components/cart';
import * as S from 'components/cart/CartProductList/CartProductList.style';

function CartProductList() {
  const {
    cart,
    cartLength,
    loadCart,
    isAllChecked,
    toggleAllCheck,
    checkedProductCount,
    deleteCheckedProducts,
  } = useCart();

  useEffect(() => {
    loadCart();
  }, []);

  return (
    <S.Container>
      <S.ListControlWrapper>
        <S.AllCheckControl>
          <CheckBox checked={isAllChecked} onClick={toggleAllCheck} />
          <S.CheckBoxLabel>
            {isAllChecked ? '전체 선택해제' : '전체 선택하기'}
          </S.CheckBoxLabel>
        </S.AllCheckControl>
        {checkedProductCount !== 0 && (
          <S.Button type="button" onClick={deleteCheckedProducts}>
            선택 상품 삭제
          </S.Button>
        )}
      </S.ListControlWrapper>
      <S.Title>장바구니 상품 목록 ({cartLength}개)</S.Title>
      <S.ListWrapper>
        {cart &&
          cart.map(({ product, quantity }) => (
            <CartProductCard
              key={product.id}
              product={product}
              quantity={quantity}
            />
          ))}
        {cartLength === 0 && (
          <ErrorContainer>장바구니에 추가된 상품이 없어요 😥</ErrorContainer>
        )}
      </S.ListWrapper>
    </S.Container>
  );
}

export default CartProductList;
