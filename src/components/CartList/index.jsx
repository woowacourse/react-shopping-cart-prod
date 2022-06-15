import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { getCart } from "@/redux/modules/cart";

import Button from "@/components/Button";
import CartItem from "@/components/CartItem";
import Checkbox from "@/components/Checkbox";
import Title from "@/components/Title";

import StyledCartList from "@/components/CartList/index.styled";

import { getCookie } from "@/utils/auth";
import { PATH } from "@/constants";

function CartList({
  checkedItemList,
  changeCheckedList,
  allChecked,
  deleteSelectedItems,
}) {
  const { cart } = useSelector((state) => state.cartState);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isAllChecked =
    cart.length !== 0 && cart.length === checkedItemList.length;

  useEffect(() => {
    const accessToken = getCookie("accessToken");
    if (!accessToken) {
      navigate(PATH.LOGIN);
    }

    dispatch(getCart());
  }, []);

  return (
    <StyledCartList>
      <div>
        <div className="checkbox-container">
          <Checkbox
            id="checkbox"
            onChange={allChecked}
            checked={isAllChecked}
          />
          <label htmlFor="checkbox" className="checkbox-label">
            선택해제
          </label>
        </div>
        <Button onClick={deleteSelectedItems} color="black">
          상품삭제
        </Button>
      </div>
      <Title titleType="listTitle">든든배송 상품({cart.length}개)</Title>
      {cart.map((item) => {
        return (
          <CartItem
            key={item.id}
            item={item}
            onChange={() => {
              changeCheckedList(item.id);
            }}
            checked={checkedItemList.includes(item.id)}
          />
        );
      })}
    </StyledCartList>
  );
}

export default CartList;
