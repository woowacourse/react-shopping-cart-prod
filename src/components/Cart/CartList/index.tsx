import Button from 'components/common/Button';
import CheckBox from 'components/common/CheckBox';
import StyledDivision from 'components/common/Division';
import { useAppDispatch } from 'hooks/useAppDispatch';
import React from 'react';
import { CartListAction, checkAllCartItem } from 'redux/cartList/action';
import { deleteAllCartItemRequest } from 'redux/cartList/thunk';
import styled from 'styled-components';
import { flexCenter } from 'styles/mixin';
import theme from 'styles/theme';
import { ItemInCart } from 'types/domain';

import CartItemContainer from './CartItemContainer';

interface CartListProps {
  cartList: ItemInCart[];
}

const CartList = ({ cartList }: CartListProps) => {
  const dispatch = useAppDispatch<CartListAction>();
  const selectedCarts = cartList.filter(cart => cart.isChecked);
  const isAllSelected = cartList.length === selectedCarts.length;
  const totalItemCount = cartList.length;

  const handleClickAllDeleteButton = () => {
    if (window.confirm('모든 상품을 삭제하시겠습니까?')) {
      dispatch(deleteAllCartItemRequest());
    }
  };

  return (
    <StyledRoot>
      <StyledTop>
        <StyledRight>
          <CheckBox
            id='check'
            checked={isAllSelected}
            onChange={() => dispatch(checkAllCartItem(isAllSelected))}
          />
          <label htmlFor='check'>선택해제</label>
        </StyledRight>
        <Button
          width='117px'
          height='50px'
          borderColor={theme.colors.GRAY_bbb}
          onClick={handleClickAllDeleteButton}
        >
          상품삭제
        </Button>
      </StyledTop>
      <StyledCount>든든배송 상품 ({totalItemCount}개)</StyledCount>
      <StyledDivision margin='20px 0' height='4px' color={theme.colors.GRAY_aaa} />
      {cartList?.map((item, index) => (
        <React.Fragment key={item.id}>
          <CartItemContainer item={item} />
          {cartList.length !== index + 1 && (
            <StyledDivision color={theme.colors.GRAY_ccc} height='2px' margin='0 0 26px' />
          )}
        </React.Fragment>
      ))}
    </StyledRoot>
  );
};

export default CartList;

const StyledRoot = styled.div`
  width: 73.5rem;
`;

const StyledTop = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 2.6rem;
  font-size: 1.6rem;
`;

const StyledCount = styled.p`
  font-size: 2rem;
`;

const StyledRight = styled.div`
  ${flexCenter}
  & > :nth-child(2) {
    margin-left: 12px;
  }
`;
