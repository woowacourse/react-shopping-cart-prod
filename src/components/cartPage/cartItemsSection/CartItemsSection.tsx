import styled from 'styled-components';
import { CartItemList } from './CartItemList';
import { selector, useRecoilState, useRecoilValue } from 'recoil';
import {
  cartItemsState,
  selectedCartIdListState,
} from '../../../recoil/atoms/cartAtom';
import { CheckBox } from '../../../layout/checkBox/CheckBox';
import { useCartRecoil } from '../../../hooks/recoil/useCartRecoil';
import { useCartFetch } from '../../../hooks/fetch/useCartFetch';
import { useEffect } from 'react';
import { APIAtom } from '../../../recoil/atoms/serverAtom';

const isAllCheckBoxSelectedState = selector({
  key: 'isAllCheckBoxSelectedState',
  get: ({ get }) => {
    const cartItems = get(cartItemsState);
    const selectedCartIdList = get(selectedCartIdListState);

    return (
      cartItems.filter((cartItem) => !selectedCartIdList.includes(cartItem.id))
        .length === 0
    );
  },
});

export const CartItemsSection = () => {
  const [cartItems, setCartItems] = useRecoilState(cartItemsState);
  const apiEndPoint = useRecoilValue(APIAtom);

  const { getCartItems } = useCartFetch();

  useEffect(() => {
    getCartItems(apiEndPoint).then((data) => {
      setCartItems(data);
    });
  }, [apiEndPoint]);

  const isAllCheckBoxChecked = useRecoilValue(isAllCheckBoxSelectedState);
  const [selectedCartIdList, setSelectedCartIdList] = useRecoilState(
    selectedCartIdListState
  );

  const { deleteRecoilCartById, getAllCartIdList: getCartItemIdList } =
    useCartRecoil();
  const { deleteCartItemById } = useCartFetch();

  const deleteSelectedProduct = () => {
    selectedCartIdList.forEach((selectedCartId) => {
      deleteRecoilCartById(selectedCartId);
      deleteCartItemById(selectedCartId);
    });
  };

  const toggleAllCheckBoxChecked: React.ChangeEventHandler<HTMLInputElement> = (
    e
  ) => {
    if (e.target.checked)
      return setSelectedCartIdList(() => getCartItemIdList());
    setSelectedCartIdList(() => []);
  };

  return (
    <Style.Container>
      <Style.Header>
        <Style.HeaderTitle>배송상품 ({cartItems.length}개)</Style.HeaderTitle>
        <Style.SelectOrDeleteContainer>
          <Style.SlectAllCheckBoxContainer>
            <CheckBox
              isChecked={isAllCheckBoxChecked}
              id={Math.random()}
              handleClickCheckBox={toggleAllCheckBoxChecked}
            />
            <Style.SelectedProductCount>
              전체선택 ({selectedCartIdList.length}/{cartItems.length})
            </Style.SelectedProductCount>
          </Style.SlectAllCheckBoxContainer>
          <Style.DeleteSelectedProductButton onClick={deleteSelectedProduct}>
            선택삭제
          </Style.DeleteSelectedProductButton>
        </Style.SelectOrDeleteContainer>
      </Style.Header>
      <CartItemList cartItemList={cartItems} />
    </Style.Container>
  );
};

const Style = {
  Container: styled.section`
    width: 100%;
    margin-bottom: 40px;

    display: flex;
    flex-direction: column;
  `,
  Header: styled.div`
    width: 100%;

    border-bottom: 4px solid #aaaaaa;
  `,
  HeaderTitle: styled.h2`
    font-size: 20px;
    color: #333333;
  `,
  SelectOrDeleteContainer: styled.div`
    display: flex;
    align-items: center;
    gap: 13px;

    margin: 23px 0;
    justify-content: space-between;
  `,
  SlectAllCheckBoxContainer: styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
  `,
  CheckBox: styled.div`
    width: 28px;
    height: 28px;

    border: 1px solid #22a6a2;
  `,
  SelectedProductCount: styled.span`
    font-size: 16px;
  `,
  DeleteSelectedProductButton: styled.button`
    width: 98px;
    height: 35px;

    display: flex;
    justify-content: center;
    align-items: center;

    border: 1px solid #bbbbbb;
    font-family: var(--baemin-font);
  `,
};
