import { ChangeEvent } from "react";
import type { ProductItem } from "../../types/types";
import {
  AddCartButton,
  CartBox,
  ControllerWrapper,
  QuantityControlButton,
  QuantityInput,
} from "./CartController.style";
import {
  cartRepositoryState,
  quantityByProductIdSelector,
} from "../../recoil/cartAtoms";
import { useRecoilValue } from "recoil";

interface CartControllerProps {
  product: ProductItem;
}

function CartController({ product }: CartControllerProps) {
  const cartRepository = useRecoilValue(cartRepositoryState);
  const { addCartItem, updateCartItemQuantity } = cartRepository;

  const quantity = useRecoilValue(quantityByProductIdSelector(product.id));

  const handleChangeQuantity = (event: ChangeEvent<HTMLInputElement>) => {
    const quantityInputValue = Number(
      event.target.value.replaceAll("/", "").replace(/\D/g, "")
    );
    const newQuantity = quantityInputValue > 100 ? 100 : quantityInputValue;

    updateCartItemQuantity(product, newQuantity);
  };

  return (
    <>
      {quantity > 0 ? (
        <ControllerWrapper>
          <CartBox>
            <QuantityControlButton
              onClick={() => {
                updateCartItemQuantity(product, quantity - 1);
              }}
            >
              -
            </QuantityControlButton>
            <QuantityInput value={quantity} onChange={handleChangeQuantity} />
            <QuantityControlButton
              onClick={() => {
                updateCartItemQuantity(product, quantity + 1);
              }}
            >
              +
            </QuantityControlButton>
          </CartBox>
        </ControllerWrapper>
      ) : (
        <AddCartButton
          onClick={() => {
            addCartItem(product.id);
          }}
        >
          장바구니에 담기
        </AddCartButton>
      )}
    </>
  );
}

export default CartController;
