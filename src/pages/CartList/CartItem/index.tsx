import { useState } from 'react';
import { useRecoilValue } from 'recoil';

import Checkbox from '@Components/Checkbox';
import Dialog from '@Components/Dialog';
import QuantityController from '@Components/QuantityController';

import { Product } from '@Types/index';

import useCartItems from '@Hooks/useCartItems';

import cartItemState from '@Selector/cartItemState';
import isCartItemSelectedState from '@Selector/isCartItemSelectedState';

import Trash from '@Asset/Trash.png';

import * as S from './style';

type CartItemProps = {
  product: Product;
  width?: string;
  cartId: number;
};

function CartItem({ product, width = '100%', cartId }: CartItemProps) {
  const { toggleSelected, deleteSelectedCartItem } = useCartItems();
  const { name, price, imageUrl } = product;
  const [isModalopen, setIsModalopen] = useState(false);

  const textPrice = `${price.toLocaleString()} 원`;

  const isCartItemSelected = product && useRecoilValue(isCartItemSelectedState(cartId));
  const cartItem = product && useRecoilValue(cartItemState(product.id));

  const deleteShoppingItem = () => {
    deleteSelectedCartItem(cartId);
  };

  const closeModal = () => {
    setIsModalopen(false);
  };

  const openModal = () => {
    setIsModalopen(true);
  };

  return (
    <S.Container aria-label="장바구니 상품" width={width}>
      <Checkbox isChecked={isCartItemSelected} size="small" updateSelectedState={() => toggleSelected(cartId)} />
      <S.ShoppingItemImage src={imageUrl} alt={name} aria-label="장바구니 상품 이미지" />
      <S.ShoppingItemName aria-label="장바구니 상품 이름">{name}</S.ShoppingItemName>
      <S.RightContents>
        <S.DeleteButton src={Trash} onClick={openModal} />
        <QuantityController
          product={product}
          quantity={cartItem?.quantity}
          cartItemId={cartItem?.cartItemId}
          isAbleSetZeroState={false}
        />
        <S.ShoppingItemPrice aria-label="장바구니 상품 가격">{textPrice}</S.ShoppingItemPrice>
      </S.RightContents>
      {isModalopen && (
        <Dialog
          message={`${name} 상품을 장바구니에서 삭제하시겠습니까?`}
          onClick={deleteShoppingItem}
          onClose={closeModal}
        />
      )}
    </S.Container>
  );
}

export default CartItem;
