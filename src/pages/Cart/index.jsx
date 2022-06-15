import { useSelector } from "react-redux";

import Title from "@/components/Title";
import CartList from "@/components/CartList";
import AmountBox from "@/components/AmountBox";

import useCheckBox from "@/hooks/useCheckBox";

import { checkedQuantityPrice } from "@/utils";
import { AMOUNTBOX_TYPE } from "@/constants";

import CartWrapper from "@/pages/Cart/index.styled";
import StyledWrapper from "@/components/Wrapper/index.styled";

function Cart() {
  const { cart } = useSelector((state) => state.cartState);
  const {
    checkedItemList,
    changeCheckedList,
    allChecked,
    deleteSelectedItems,
  } = useCheckBox(cart);

  const checkedItems = cart.filter(({ id }) => checkedItemList.includes(id));
  const { totalQuantity, totalPrice } = checkedQuantityPrice(checkedItems);

  return (
    <StyledWrapper>
      <Title>장바구니</Title>
      <CartWrapper>
        <CartList
          checkedItemList={checkedItemList}
          changeCheckedList={changeCheckedList}
          allChecked={allChecked}
          deleteSelectedItems={deleteSelectedItems}
        />
        <AmountBox
          type={AMOUNTBOX_TYPE.CART}
          totalQuantity={totalQuantity}
          totalPrice={totalPrice}
        />
      </CartWrapper>
    </StyledWrapper>
  );
}

export default Cart;
