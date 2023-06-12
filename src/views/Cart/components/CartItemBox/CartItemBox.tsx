import { CheckBox } from "@common/CheckBox";
import { useCheckCart } from "@views/Cart/hooks/useCart";
import { CartProductInfo } from "@views/Cart/components/CartProductInfo";

import { ProductItemType } from "types/ProductType";

import * as S from "./CartItemBox.style";

interface CartItemProps {
  cartItemId: number;
  product: ProductItemType;
}

function CartItemBox({ cartItemId, product }: CartItemProps) {
  const { setCartItemIsChecked, getCartItemIsChecked } = useCheckCart();
  const isChecked = getCartItemIsChecked(cartItemId);

  const { name, imageUrl } = product;

  return (
    <S.CartItemContainer>
      <CheckBox
        type="checkbox"
        checked={isChecked}
        onChange={() => {
          setCartItemIsChecked(cartItemId);
        }}
        size="medium"
      />
      <S.ItemImageWrapper>
        <S.ItemImage src={imageUrl} />
      </S.ItemImageWrapper>
      <S.NameText>{name}</S.NameText>
      <CartProductInfo cartItemId={cartItemId} product={product} />
    </S.CartItemContainer>
  );
}

export default CartItemBox;
