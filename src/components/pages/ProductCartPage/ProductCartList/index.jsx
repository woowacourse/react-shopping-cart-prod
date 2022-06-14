import { useSelector } from "react-redux";

import { useStore } from "hooks/useStore";
import { deleteCartList, updateCartCount } from "reducers/cartList";

import CheckBox from "components/common/CheckBox";
import ProductCartItem from "../ProductCartItem";
import {
  CartListControlContainer,
  CartListCount,
  DeleteCartButton,
} from "./styled";
import Spinner from "components/common/Spinner";
import ErrorPage from "components/pages/ErrorPage";

function ProductCartList({ checkList, setCheckList }) {
  const serverUrlIndex = useSelector((state) => state.server.serverUrlIndex);
  const {
    data: cartList,
    isLoading,
    errorMessage,
    dispatch,
  } = useStore("cartList");

  const handleChangeAllCheckbox = () => {
    if (checkList.length === 0) {
      setCheckList(cartList.map((cartItem) => cartItem.productId));
      return;
    }
    setCheckList([]);
  };

  const handleDeleteAllItem = () => {
    checkList.forEach((carItemId) => {
      dispatch(deleteCartList(carItemId, serverUrlIndex));
    });
    setCheckList([]);
  };

  const handleClickIncreaseButton = (productId, count, quantity) => () => {
    if (count >= quantity) {
      alert("재고가 부족합니다.");
      return;
    }

    if (!checkList.includes(productId))
      setCheckList((prev) => [...prev, productId]);
    dispatch(updateCartCount(productId, count + 1, serverUrlIndex));
  };

  const handleClickDecreaseButton = (productId, count) => () => {
    if (count <= 1) return;
    if (!checkList.includes(productId))
      setCheckList((prev) => [...prev, productId]);
    dispatch(updateCartCount(productId, count - 1, serverUrlIndex));
  };

  const handleClickDeleteItemButton = (productId) => () => {
    dispatch(deleteCartList(productId, serverUrlIndex));
    setCheckList((prev) =>
      prev.filter((cartItemId) => cartItemId !== productId)
    );
  };

  const handleChangeCheckbox = (productId) => () => {
    if (checkList.includes(productId)) {
      setCheckList((prev) =>
        prev.filter((cartItemId) => cartItemId !== productId)
      );
      return;
    }
    setCheckList((prev) => [...prev, productId]);
  };

  const renderListContent = () => {
    if (isLoading) return <Spinner />;
    if (cartList.length === 0) return <div>담은 상품이 없습니다.</div>;
    return (
      <>
        {cartList.map((cartItem) => (
          <ProductCartItem
            product={cartItem}
            checkList={checkList}
            handleClickIncreaseButton={handleClickIncreaseButton}
            handleClickDecreaseButton={handleClickDecreaseButton}
            handleClickDeleteItemButton={handleClickDeleteItemButton}
            handleChangeCheckbox={handleChangeCheckbox}
            key={cartItem.productId}
          />
        ))}
      </>
    );
  };

  return (
    <>
      <CartListControlContainer>
        <CheckBox
          isChecked={checkList.length !== 0}
          handleChangeCheckbox={handleChangeAllCheckbox}
          disabled={cartList.length === 0}
        >
          선택해제
        </CheckBox>
        <DeleteCartButton
          onClick={handleDeleteAllItem}
          disabled={cartList.length === 0}
        >
          상품 삭제
        </DeleteCartButton>
      </CartListControlContainer>
      <CartListCount>
        든든배송 상품 ({cartList?.length ?? "%ERROR%"}개)
      </CartListCount>
      {errorMessage && <ErrorPage>에러: ${errorMessage} </ErrorPage>}
      {renderListContent()}
    </>
  );
}

export default ProductCartList;
