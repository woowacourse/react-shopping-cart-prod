import React from 'react';
import {useSelector} from 'react-redux';

import ContentBox from 'component/common/ContentBox';

import OrderItem from 'component/OrderItem';

import * as S from 'page/OrderPayPage/style';

import {SmingPayment, useSmingPayment} from 'sming-payments';
import {API_URL, PATH} from 'constant';
import {useNavigate} from 'react-router-dom';
import useCartItem from 'hook/useCartItem';
import useFetch from 'hook/useFetch';

export default function OrderPayPage() {
  const {isShowModal, toggleModal} = useSmingPayment();

  const accessToken = useSelector((state) => state.authReducer.accessToken);

  const {deleteCartItem} = useCartItem();

  const navigation = useNavigate();

  const postOrderList = useFetch('post');

  const cartItem = useSelector((state) => state.cartReducer.cart);
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
    const order = selectedCartItem.map(({id, quantity}) => ({
      id,
      quantity,
    }));

    postOrderList.fetch({
      API_URL: `${API_URL}/customers/orders`,
      headers: {Authorization: `Bearer ${accessToken}`},
      body: {
        order,
      },
      onSuccess: () => {
        navigation(PATH.ORDER_LIST);
        selectedCartItem.forEach(({id}) => {
          deleteCartItem(id, false);
        });
      },
    });
  };

  return (
    <S.Layout>
      <S.HeaderSpan>주문/결제</S.HeaderSpan>
      <S.ProductTable>
        <S.ProductInfoContainer>
          <S.ListHeaderSpan>주문 상품 ({selectedCartItem.length}건)</S.ListHeaderSpan>
          <S.ProductListContainer>
            {selectedCartItem.map((productInfo) => {
              return (
                <React.Fragment key={productInfo.id}>
                  <OrderItem productInfo={productInfo} />
                  <hr />
                </React.Fragment>
              );
            })}
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
