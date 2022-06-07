import React from 'react';
import {useSelector} from 'react-redux';

import ContentBox from 'component/common/ContentBox';
import ErrorPendingBoundary from 'component/common/ErrorPendingBoundary';

import OrderItem from 'component/OrderItem';

import NotFoundPage from 'page/NotFoundPage';
import * as S from 'page/OrderPayPage/style';

import {SmingPayment, useSmingPayment} from 'sming-payments';
import {PATH} from 'constant';
import {useNavigate} from 'react-router-dom';
import useCartItem from 'hook/useCartItem';

export default function OrderPayPage() {
  const {isShowModal, toggleModal} = useSmingPayment();

  const {deleteCartItem} = useCartItem();

  const navigation = useNavigate();

  const cartItem = useSelector((state) => state.cartReducer.cart);
  const error = useSelector((state) => state.cartReducer.error);
  const pending = useSelector((state) => state.cartReducer.pending);
  const selectedItem = useSelector((state) => state.selectedItemReducer.selectedItem);

  const selectedCartItem = cartItem.filter(({id}) => selectedItem.includes(id));

  const {totalPrice} = selectedCartItem.reduce(
    (prev, cur) => ({
      totalPrice: cur.price * cur.quantity + prev.totalPrice,
    }),
    {totalPrice: 0},
  );

  const onClickOrderButton = () => toggleModal();

  const onClickPayButton = () => {
    navigation(PATH.ORDER_LIST);
    selectedCartItem.forEach(({id}) => {
      deleteCartItem(id, false);
    });
    // todo: 주문 목록에 상품 추가
  };

  return (
    <S.Layout>
      <S.HeaderSpan>주문/결제</S.HeaderSpan>
      <S.ProductTable>
        <S.ProductInfoContainer>
          <S.ListHeaderSpan>주문 상품 ({selectedCartItem.length}건)</S.ListHeaderSpan>
          <S.ProductListContainer>
            <ErrorPendingBoundary
              error={error}
              pending={pending}
              fallback={<NotFoundPage>에러가 발생했어요.</NotFoundPage>}
            >
              {selectedCartItem.map((productInfo) => {
                return (
                  <React.Fragment key={productInfo.id}>
                    <OrderItem productInfo={productInfo} />
                    <hr />
                  </React.Fragment>
                );
              })}
            </ErrorPendingBoundary>
          </S.ProductListContainer>
        </S.ProductInfoContainer>

        <ContentBox
          headerText="결제금액"
          leftContent="총 결제금액"
          rightContent={`${totalPrice.toLocaleString()}원`}
          buttonText={`${totalPrice.toLocaleString()}원 결제하기`}
          onClickButton={onClickOrderButton}
        />
      </S.ProductTable>

      <SmingPayment
        price={totalPrice}
        isShowModal={isShowModal}
        toggleModal={toggleModal}
        payButtonHandler={onClickPayButton}
      />
    </S.Layout>
  );
}
