import {ChangeEvent} from "react";
import type {ProductItem} from "../../types/types";
import {
  AddCartButton,
  CartBox,
  ControllerWrapper,
  QuantityControlButton,
  QuantityInput,
} from "./CartController.style";
import {useRecoilValue} from "recoil";
import {userRepository} from "../../app/recoil/user/userRepository";
import {quantityByProductIdSelector} from "../../app/recoil/cart/cartSelectors.ts";
import {cartRepository} from "../../app/recoil/cart/cartRepository.ts";

interface CartControllerProps {
  product: ProductItem;
}

function CartController({product}: CartControllerProps) {
  const {addCartItem, updateCartItemQuantity} = useRecoilValue(cartRepository);
  const {loginCheckerCallback} = useRecoilValue(userRepository);
  const quantity = useRecoilValue(quantityByProductIdSelector(product.id));

  const handleChangeQuantityByInput = (
    event: ChangeEvent<HTMLInputElement>
  ) => {
    loginCheckerCallback(() => {
      const quantityInputValue = Number(
        event.target.value.replaceAll("/", "").replace(/\D/g, "")
      );
      const newQuantity = quantityInputValue > 100 ? 100 : quantityInputValue;

      updateCartItemQuantity(product, newQuantity);
    });
  };

  const handleChangeQuantityByButton = (type: "increase" | "decrease") => {
    switch (type) {
      case "increase":
        if (quantity < 100) {
          loginCheckerCallback(() => {
            updateCartItemQuantity(product, quantity + 1);
          });
        }
        break;
      case "decrease":
        if (quantity > 0) {
          loginCheckerCallback(() => {
            updateCartItemQuantity(product, quantity - 1);
          });
        }
        break;
    }
  };

  const handleAddCartButton = () => {
    loginCheckerCallback(() => {
      addCartItem(product.id);
    });
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
        <AddCartButton onClick={handleAddCartButton}>
          장바구니에 담기
        </AddCartButton>
      )}
    </>
  );
}

export default CartController;
