import { useDispatch, useSelector } from "react-redux";

import {
  uncheckAllCheckButton,
  checkAllCheckButton,
  removeCheckedCartItem,
} from "@/redux/modules/cartList";

import Button from "@/components/Button";
import CartItem from "@/components/CartItem";
import Checkbox from "@/components/Checkbox";
import Title from "@/components/Title";

import StyledProductList from "@/components/CartList/index.styled";

function ProductList() {
  const cartList = useSelector((state) => state.cartListState);
  const dispatch = useDispatch();

  const allCheckboxIsChecked = () => {
    const isAllChecked = cartList.every((item) => item.checked === true);
    return isAllChecked;
  };

  const handleChange = (e) => {
    const { checked } = e.target;

    if (checked) {
      dispatch(checkAllCheckButton());
      return;
    }
    dispatch(uncheckAllCheckButton());
  };

  const handleClick = () => {
    const isNonExistCheckedItem = cartList.every(
      (item) => item.checked === false
    );
    if (isNonExistCheckedItem) return;

    dispatch(removeCheckedCartItem());
  };

  return (
    <StyledProductList>
      <div>
        <div className="checkbox-container">
          <Checkbox
            id="checkbox"
            onChange={handleChange}
            checked={allCheckboxIsChecked() ? true : false}
          />
          <label htmlFor="checkbox" className="checkbox-label">
            선택해제
          </label>
        </div>
        <Button onClick={handleClick} color="black1">
          상품삭제
        </Button>
      </div>
      <Title titleType="listTitle">든든배송 상품({cartList.length}개)</Title>
      {cartList.map((item) => {
        return <CartItem key={item.id} item={item} />;
      })}
    </StyledProductList>
  );
}

export default ProductList;
