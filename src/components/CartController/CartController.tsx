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
  cartRepository,
  quantityByProductIdSelector,
} from "../../recoil/cartAtoms";
import { useRecoilValue } from "recoil";

interface CartControllerProps {
  product: ProductItem;
}

function CartController({ product }: CartControllerProps) {
  const { addCartItem, updateCartItemQuantity } =
    useRecoilValue(cartRepository);
  const quantity = useRecoilValue(quantityByProductIdSelector(product.id));

  const handleChangeQuantityByInput = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    const quantityInputValue = Number(
      event.target.value.replaceAll("/", "").replace(/\D/g, "")
    );
    const newQuantity = quantityInputValue > 100 ? 100 : quantityInputValue;

    updateCartItemQuantity(product, newQuantity);
  };

  const handleChangeQuantityByButton = (type: "increase" | "decrease") => {
    switch (type) {
      case "increase":
        if (quantity < 100) {
          updateCartItemQuantity(product, quantity + 1);
        }
        break;
      case "decrease":
        if (quantity > 0) {
          updateCartItemQuantity(product, quantity - 1);
        }
        break;
    }
  };

  return (
    <>
      {quantity > 0 ? (
        <ControllerWrapper>
          <CartBox>
            <QuantityControlButton
              onClick={() => {
                handleChangeQuantityByButton("decrease");
              }}
            >
              -
            </QuantityControlButton>
            <QuantityInput
              value={quantity}
              onChange={handleChangeQuantityByInput}
            />
            <QuantityControlButton
              onClick={() => {
                handleChangeQuantityByButton("increase");
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
