import Checkbox from '@Components/Checkbox';
import QuantityController from '@Components/QuantityController';

import { Product } from '@Types/index';

import useCartItems from '@Hooks/useCartItems';

import { SHOPPING_QUANTITY } from '@Constants/index';

import Trash from '@Asset/Trash.png';

import * as S from './style';

type CartItemProps = {
  product: Product;
  width?: string;
  cartId: number;
};

function CartItem({ product, width = '100%', cartId }: CartItemProps) {
  const { toggleSelected, deleteSelectedCartItem, isSelected, getCartItem } = useCartItems();
  const { name, price, imageUrl, id } = product;
  const cartItem = getCartItem(id);
  const quantity = cartItem ? cartItem.quantity : SHOPPING_QUANTITY.MIN;

  const textPrice = `${price.toLocaleString()} 원`;

  const deleteShoppingItem = () => {
    if (!window.confirm(`${name} 상품을 장바구니에서 삭제하시겠습니까?`)) return;

    deleteSelectedCartItem(cartId);
  };

  return (
    <S.Container aria-label="장바구니 상품" width={width}>
      <Checkbox isChecked={isSelected(cartId)} size="small" updateSelectedState={() => toggleSelected(cartId)} />
      <S.ShoppingItemImage src={imageUrl} alt={name} aria-label="장바구니 상품 이미지" />
      <S.ShoppingItemName aria-label="장바구니 상품 이름">{name}</S.ShoppingItemName>
      <S.RightContents>
        <S.DeleteButton src={Trash} onClick={deleteShoppingItem} />
        <QuantityController product={product} quantity={quantity} cartItemId={cartId} isAbleSetZeroState={false} />
        <S.ShoppingItemPrice aria-label="장바구니 상품 가격">{textPrice}</S.ShoppingItemPrice>
      </S.RightContents>
    </S.Container>
  );
}

export default CartItem;
