import { useEffect } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import styled from 'styled-components';

import CartItem from './CartItem';
import CheckBox from '../common/CheckBox';

import * as api from '../../api';
import useToast from '../../hooks/useToast';
import { cartState, checkedListState, serverNameState } from '../../recoil/state';
import { API_ERROR_MESSAGE } from '../../constants';

export default function CartItemList() {
  const [cart, setCart] = useRecoilState(cartState);
  const [checkedList, setCheckedList] = useRecoilState(checkedListState);
  const serverName = useRecoilValue(serverNameState);
  const { showToast } = useToast();

  const checkedCount = checkedList.filter((checked) => checked).length;
  const allChecked = checkedCount === cart.length;

  const checkAll = () => {
    setCheckedList(checkedList.map(() => true));
  };

  const uncheckAll = () => {
    setCheckedList(checkedList.map(() => false));
  };

  const toggleCheckedList = (index: number) => () => {
    setCheckedList(checkedList.toSpliced(index, 1, !checkedList[index]));
  };

  const deleteCheckedList = (index: number) => () => {
    setCheckedList(checkedList.toSpliced(index, 1));
  };

  const removeCheckedCartItem = async () => {
    const cartItemIdList = cart
      .filter((_, index) => checkedList[index])
      .map((cartItem) => cartItem.id);

    try {
      await api.deleteCartItems(serverName, cartItemIdList);
    } catch {
      showToast('error', API_ERROR_MESSAGE.deleteCartItem);
    }

    try {
      const cart = await api.getCart(serverName);
      setCart(cart);
      setCheckedList(Array(cart.length).fill(false));
    } catch {
      showToast('error', API_ERROR_MESSAGE.getCart);
    }
  };

  useEffect(() => {
    try {
      api.getCart(serverName).then((cart) => {
        setCart(cart);
        setCheckedList(Array(cart.length).fill(true));
      });
    } catch {
      showToast('error', API_ERROR_MESSAGE.getCart);
    }
  }, [serverName]);

  return (
    <Wrapper>
      <CountMessage>배송 상품 ({cart.length}개)</CountMessage>
      <List>
        {cart.map((cartItem, index) => (
          <ListItemBox key={cartItem.id}>
            <CartItem
              {...cartItem}
              checked={checkedList[index]}
              toggleChecked={toggleCheckedList(index)}
              deleteChecked={deleteCheckedList(index)}
            />
          </ListItemBox>
        ))}
      </List>
      <RemoveBox>
        <CheckBox checked={allChecked} onClickCheckbox={allChecked ? uncheckAll : checkAll} />
        <RemoveLabel>
          전체선택 ({checkedCount}/{checkedList.length})
        </RemoveLabel>
        <RemoveButton onClick={removeCheckedCartItem}>선택삭제</RemoveButton>
      </RemoveBox>
    </Wrapper>
  );
}

const Wrapper = styled.div`
  width: 736px;

  @media (max-width: 736px) {
    width: 100%;
  }
`;

const CountMessage = styled.p`
  width: 100%;
  margin-top: 16px;
  padding: 24px 0;

  line-height: 34px;
  letter-spacing: 0.5px;
  font-size: 20px;
  color: #333333;
`;

const List = styled.div`
  min-height: 128px;
  max-height: 612px;
  border-top: 4px solid #aaaaaa;

  overflow: scroll;
`;

const ListItemBox = styled.div`
  padding: 28px 0;

  & + & {
    border-top: 1.5px solid #cccccc;
  }
`;

const RemoveBox = styled.div`
  display: flex;
  align-items: center;

  margin-top: 8px;
`;

const RemoveLabel = styled.p`
  margin: 0 16px;

  line-height: 20px;
  letter-spacing: 0.5px;
  font-size: 16px;
  color: #333333;
`;

const RemoveButton = styled.button`
  width: 98px;
  height: 36px;

  border: 1px solid #bbbbbb;
  background: #ffffff;

  font-size: 16px;
  color: #333333;
`;
