import { useEffect } from 'react';
import { useRecoilRefresher_UNSTABLE, useResetRecoilState } from 'recoil';
import { styled } from 'styled-components';
import CartItem from '../CartItem/CartItem';
import CheckBox from '../../common/CheckBox/CheckBox';
import useCartService from '../../../hooks/useCartService';
import { useCheckedCartListValue } from '../../../provider/CheckedListProvider';
import cartState from '../../../globalState/atoms/cartState';
import fetchCartItemList from '../../../globalState/selectors/fetchCartItemList';
import useResetCartWhenServerChange from '../../../hooks/useResetCartWhenServerChange';

const CartList = () => {
  const {
    checkedCartIdList,
    checkAllCartItem,
    uncheckAllCartItem,
    isAllChecked,
  } = useCheckedCartListValue();
  const { cartList, deleteCartItem } = useCartService();

  const refreshFetchCartList = useRecoilRefresher_UNSTABLE(fetchCartItemList);
  const resetCart = useResetRecoilState(cartState);

  const handleAllCheckBoxChange = () => {
    if (isAllChecked()) {
      uncheckAllCartItem();
      return;
    }

    checkAllCartItem();
  };

  const handleDeleteCheckedListButtonClick = () => {
    if (
      !window.confirm(
        `${checkedCartIdList.length}개의 선택한 품목들을 삭제하시겠습니까?`,
      )
    )
      return;

    checkedCartIdList.forEach((checkedCartItem) =>
      deleteCartItem(checkedCartItem),
    );
    uncheckAllCartItem();
  };

  useEffect(() => {
    refreshFetchCartList();
    resetCart();
  }, []);

  useResetCartWhenServerChange();

  return (
    <CartListContainer>
      <NumberOfCartItem>배송 상품 ({cartList.length}개)</NumberOfCartItem>
      <ul>
        {cartList.map((cartItem, index) => (
          <li key={cartItem.id}>
            <CartItem cartItem={cartItem} />
            {index !== cartList.length - 1 && <Seperator />}
          </li>
        ))}
      </ul>
      <AllCheckContainer>
        <CheckBox
          isChecked={isAllChecked()}
          labelText={`전체 선택 (${checkedCartIdList.length}/${cartList.length})`}
          onChange={handleAllCheckBoxChange}
        />
        {!!checkedCartIdList.length && (
          <DeleteCheckedListButton onClick={handleDeleteCheckedListButtonClick}>
            선택 삭제
          </DeleteCheckedListButton>
        )}
      </AllCheckContainer>
    </CartListContainer>
  );
};

const CartListContainer = styled.div`
  width: 736px;

  @media screen and (max-width: 1320px) {
    width: 100%;
  }
`;

const NumberOfCartItem = styled.h3`
  padding: 20px 0;

  border-bottom: 4px solid #aaaaaa;

  font-weight: 400;
  font-size: 20px;
  color: #333;
`;

const Seperator = styled.div`
  border-bottom: 1.5px solid #cccccc;
`;

const AllCheckContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;

  height: 30px;
`;

const DeleteCheckedListButton = styled.button`
  width: 98px;
  height: 35px;

  background: none;
  border: 1px solid #bbbbbb;

  font-weight: 400;
  font-size: 16px;

  cursor: pointer;
`;

export default CartList;
