import { useEffect, useState } from 'react';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { styled } from 'styled-components';
import {
  cartAtom,
  checkedValue,
  isSelectedListAtom,
  totalAmountAtom,
} from '../../store/cart';
import { WIDTH } from '../../styles/mediaQuery';
import CartItem from '../CartItem/CartItem';
import CheckBox from '../common/CheckBox/CheckBox';
import useFetchCart from '../../hooks/useFetchCart';
import { serverAtom } from '../../store/server';

const CartItemList = () => {
  const { deleteCartItem } = useFetchCart();
  const [cartList, setCartList] = useRecoilState(cartAtom);
  const { ALL_CHECKED, NO_CHECKED } = useRecoilValue(checkedValue);
  const [isAllSelected, setIsAllSelected] = useState<boolean>(true);
  const [isSelectedList, setIsSelectedList] =
    useRecoilState(isSelectedListAtom);
  const setTotalAmount = useSetRecoilState(totalAmountAtom);
  const serverName = useRecoilValue(serverAtom);

  useEffect(() => {
    setIsSelectedList(ALL_CHECKED);
  }, [serverName]);

  useEffect(() => {
    const total = isSelectedList.reduce((a, b) => {
      if (b.isSelected) {
        let cart = cartList.find((item) => item.id === b.id);
        if (cart) return a + cart.quantity * cart.product.price;
      }
      return a;
    }, 0);
    setTotalAmount(total);
  }, [isSelectedList, cartList]); //총 주문금액은 quantity랑 선택 상태에 의존하니까

  const toggleSelectAll = () => {
    setIsAllSelected(!isAllSelected);
    setIsSelectedList(!isAllSelected ? ALL_CHECKED : NO_CHECKED);
  };

  const countSelectedItems = () => {
    return isSelectedList.filter((item) => item.isSelected === true).length;
  };

  const deleteSelectedItems = () => {
    isSelectedList.forEach((item) => {
      if (item.isSelected) {
        deleteCartItem(item.id);
        setCartList((prev) => [...prev.filter((cart) => cart.id !== item.id)]);
      }
    });
  };

  return (
    <Wrapper>
      <SubTitle>배송 상품 ({cartList.length}개)</SubTitle>
      <Ul>
        {cartList.map((item) => {
          return (
            <CartItem
              key={item.id}
              cart={item}
              setIsAllSelected={setIsAllSelected}
            />
          );
        })}

        {Boolean(cartList.length) && (
          <CheckBoxWrapper>
            <CheckBox onClick={toggleSelectAll} checked={isAllSelected} />
            <span>
              전체선택 ({countSelectedItems()}/{cartList.length})
            </span>
            <DeleteSelectedItemsButton onClick={deleteSelectedItems}>
              선택삭제
            </DeleteSelectedItemsButton>
          </CheckBoxWrapper>
        )}
      </Ul>
    </Wrapper>
  );
};

export default CartItemList;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  width: 720px;
  min-width: ${WIDTH.SM};

  margin-top: 16px;

  @media (max-width: ${WIDTH.LG}) {
    width: 90vw;
    min-width: 375px;
  }
`;

const SubTitle = styled.div`
  width: 90%;
  height: 40px;

  font-weight: 200;

  border-bottom: 1px solid #aaaaaa;
`;

const Ul = styled.ul`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;

  width: 100%;

  padding: 8px;
`;

const CheckBoxWrapper = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;

  padding: 8px;

  width: 100%;
`;

const DeleteSelectedItemsButton = styled.button`
  border: 1px solid var(--grey-100);

  padding: 8px 12px;

  font-weight: 200;
`;
