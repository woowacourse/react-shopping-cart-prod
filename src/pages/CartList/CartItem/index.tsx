import { useRecoilValue } from 'recoil';

import Checkbox from '@Components/Checkbox';
import QuantityController from '@Components/QuantityController';

import { Product } from '@Types/index';

import useCartItems from '@Hooks/useCartItems';
import useProduct from '@Hooks/useProduct';

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
  const { name, price, image, imageDescription } = useProduct(product);

  const isCartItemSelected = product && useRecoilValue(isCartItemSelectedState(cartId));
  const cartItem = product && useRecoilValue(cartItemState(product.id));

  const deleteShoppingItem = () => {
    if (!window.confirm(`${name} 상품을 장바구니에서 삭제하시겠습니까?`)) return;

    deleteSelectedCartItem(cartId);
  };

  return (
    <S.Container aria-label="장바구니 상품" width={width}>
      <Checkbox isChecked={isCartItemSelected} size="small" updateSelectedState={() => toggleSelected(cartId)} />
      <S.ShoppingItemImage src={image} alt={imageDescription} aria-label="장바구니 상품 이미지" />
      <S.ShoppingItemName aria-label="장바구니 상품 이름">{name}</S.ShoppingItemName>
      <S.RightContents>
        <S.DeleteButton src={Trash} onClick={deleteShoppingItem} />
        <QuantityController
          product={product}
          quantity={cartItem?.quantity}
          cartItemId={cartItem?.cartItemId}
          isAbleSetZeroState={false}
        />
        <S.ShoppingItemPrice aria-label="장바구니 상품 가격">{price}</S.ShoppingItemPrice>
      </S.RightContents>
    </S.Container>
  );
}

export default CartItem;
