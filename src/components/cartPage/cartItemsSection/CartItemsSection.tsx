import styled from 'styled-components';
import { CartItemList } from './CartItemList';
import { useRecoilValue } from 'recoil';
import {
  cartItemsState,
  selectedCartIdListState,
} from '../../../recoil/atoms/cartAtom';
import { CheckBox } from '../../../layout/checkBox/CheckBox';
import { priceSummaryState } from '../../../recoil/selectors/priceSummarySelector';
import { getCommaAddedNumber } from '../../../utils/number';
import { isAllCheckBoxSelectedState } from '../../../recoil/selectors/cartListSelector';
import { useCartItemSelect } from '../../../hooks/cartPage/useCartItemSelect';
import { OrderModal } from '../orderModal/OrderModal';
import { useState } from 'react';

export const CartItemsSection = () => {
  const cartItems = useRecoilValue(cartItemsState);
  const isAllCheckBoxChecked = useRecoilValue(isAllCheckBoxSelectedState);
  const selectedCartIdList = useRecoilValue(selectedCartIdListState);
  const { totalPrice } = useRecoilValue(priceSummaryState);

  const { deleteSelectedProduct, toggleAllCheckBoxChecked } =
    useCartItemSelect();

  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Style.Container>
      {isModalOpen && <OrderModal closeModal={() => setIsModalOpen(false)} />}
      <Style.Header>
        <Style.HeaderTitle>배송상품 ({cartItems.length}개)</Style.HeaderTitle>
      </Style.Header>
      <CartItemList cartItemList={cartItems} />
      <Style.SelectOrDeleteContainer>
        <CheckBox
          isChecked={isAllCheckBoxChecked}
          id={Math.random()}
          handleClickCheckBox={toggleAllCheckBoxChecked}
        />
        <Style.SelectedProductCount>
          전체선택 ({selectedCartIdList.length}/{cartItems.length})
        </Style.SelectedProductCount>
        <Style.DeleteSelectedProductButton
          onClick={() =>
            deleteSelectedProduct('선택한 상품들을 삭제하시겠습니까?')
          }
        >
          선택삭제
        </Style.DeleteSelectedProductButton>
      </Style.SelectOrDeleteContainer>
      <Style.BottomOrderSummary>
        <Style.TotalPrice>
          총 금액: {getCommaAddedNumber(totalPrice)}원
        </Style.TotalPrice>
        <Style.OrderNavigation>
          <Style.SelectAllButtonContainer>
            <CheckBox
              isChecked={isAllCheckBoxChecked}
              id={Math.random()}
              handleClickCheckBox={toggleAllCheckBoxChecked}
            />
            <Style.SelectedProductCount>
              <Style.Caption>전체선택</Style.Caption>
              <Style.Caption>
                ({selectedCartIdList.length}/{cartItems.length})
              </Style.Caption>
            </Style.SelectedProductCount>
          </Style.SelectAllButtonContainer>
          <Style.DeleteSelectedItemsButton
            onClick={() =>
              deleteSelectedProduct('선택한 상품들을 삭제하시겠습니까?')
            }
          >
            선택삭제
          </Style.DeleteSelectedItemsButton>
          <Style.OrderButton
            onClick={() => {
              if (selectedCartIdList.length === 0)
                return alert('상품을 선택해주세요!');
              setIsModalOpen(true);
            }}
          >
            주문하기
          </Style.OrderButton>
        </Style.OrderNavigation>
      </Style.BottomOrderSummary>
    </Style.Container>
  );
};

const Style = {
  Container: styled.section`
    width: 740px;
    min-height: 704px;

    display: flex;
    flex-direction: column;
    align-items: center;

    padding-bottom: 70px;

    @media screen and (max-width: 480px) {
      width: 100vw;

      align-items: center;
    }
  `,
  Header: styled.div`
    width: 100%;
    height: 56px;

    border-bottom: 4px solid #aaaaaa;

    @media screen and (max-width: 480px) {
      width: 90vw;
      height: 40px;

      align-items: center;
    }
  `,
  HeaderTitle: styled.h2`
    font-size: 20px;
    color: #333333;
  `,
  SelectOrDeleteContainer: styled.div`
    width: 100%;

    display: flex;
    align-items: center;
    gap: 13px;

    margin-top: 23px;

    @media screen and (max-width: 480px) {
      display: none;
    }
  `,
  CheckBox: styled.div`
    width: 28px;
    height: 28px;

    border: 1px solid #22a6a2;
  `,
  SelectedProductCount: styled.div`
    width: max-content;
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
  BottomOrderSummary: styled.div`
    width: 100vw;
    height: 140px;

    position: fixed;
    bottom: 0;

    @media screen and (min-width: 480px) {
      display: none;
    }
  `,
  TotalPrice: styled.div`
    width: 100vw;
    height: 50px;

    display: flex;
    align-items: center;

    background-color: #f0f0f0;
    padding-left: 20px;
    border-top: 1px solid #d0d0d0;
    font-size: 18px;
  `,
  OrderNavigation: styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;

    background-color: white;
    border-top: 1px solid #d0d0d0;
    padding-left: 20px;
  `,
  SelectAllButtonContainer: styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
  `,
  DeleteSelectedItemsButton: styled.button`
    height: 89px;

    font-size: 18px;
    color: #ff7d7d;
    font-family: var(--baemin-font);
  `,
  OrderButton: styled.button`
    all: unset;

    width: 120px;
    height: 89px;

    display: flex;
    align-items: center;
    justify-content: center;

    font-size: 24px;
    color: white;
    background-color: rgb(42, 193, 188);
    box-sizing: border-box;
  `,
  Caption: styled.span`
    color: #afafaf;
  `,
};
