import { CartItem } from 'types/domain';
import styled from 'styled-components';
import { flexCenter } from 'styles/mixin';
import useUpdateCartItem from 'hooks/useUpdateCartItem';
import CheckBox from 'components/@common/CheckBox';
import CartItemContainer from './CartItemContainer';

interface CartListProps {
  cartList: CartItem[];
}

const CartList = ({ cartList }: CartListProps) => {
  const { toggleCartItemAllChecked, removeSelectedCartItem } = useUpdateCartItem(cartList);
  const isAllItemChecked = cartList.every(cartItem => cartItem.checked);

  const toggleCheckedAll = () => {
    const targetItemList = cartList.filter(cartItem => cartItem.checked === isAllItemChecked);

    toggleCartItemAllChecked(targetItemList);
  };

  const deleteSelectedItem = () => {
    removeSelectedCartItem();
  };

  return (
    <Styled.CartList>
      <Styled.ButtonSet>
        <Styled.CheckBoxWrapper>
          <CheckBox
            id='전체 선택'
            checked={isAllItemChecked}
            onChange={toggleCheckedAll}
          ></CheckBox>
          <p>선택 해제</p>
        </Styled.CheckBoxWrapper>
        <Styled.DeleteSelectedButton onClick={deleteSelectedItem}>
          상품 삭제
        </Styled.DeleteSelectedButton>
      </Styled.ButtonSet>
      <Styled.CartItemListHeader>
        든든상품배송 {`( ${cartList.length} )`}개
      </Styled.CartItemListHeader>
      <Styled.CartItemList>
        {cartList.map(cartItem => (
          <CartItemContainer key={cartItem.id} cartList={cartList} cartItem={cartItem} />
        ))}
      </Styled.CartItemList>
    </Styled.CartList>
  );
};

const Styled = {
  CartList: styled.div`
    grid-area: cl;
    display: inline-block;
    width: 73.6rem;
    height: 72.4rem;
  `,

  ButtonSet: styled.div`
    display: flex;
    justify-content: space-between;

    margin-bottom: 2rem;
  `,

  DeleteSelectedButton: styled.button`
    ${flexCenter}
    width: 11.7rem;
    height: 5rem;
    border: solid silver 1px;
    font-family: 'Noto Sans KR';
    font-style: normal;
    font-weight: 400;
    font-size: 1.6rem;
    line-height: 2.1rem;

    text-align: center;
  `,

  CheckBoxWrapper: styled.div`
    display: flex;
    font-size: 2rem;
    width: 13.5rem;

    justify-content: space-between;
  `,

  CartItemListHeader: styled.p`
    padding: 0.5rem 0rem;

    border-bottom: solid silver 0.4rem;
    font-size: 2rem;
  `,

  CartItemList: styled.div`
    width: 73.6rem;
    height: 70rem;
    overflow: auto;

    padding-right: 1rem;

    &::-webkit-scrollbar {
      width: 6px;
      background-color: inherit;
    }
    &::-webkit-scrollbar-thumb {
      background-color: inherit;
    }
    &::-webkit-scrollbar-track {
      background-color: inherit;
    }
  `,
};

export default CartList;
