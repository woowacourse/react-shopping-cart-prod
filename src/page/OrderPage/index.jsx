import React from 'react';
import * as S from 'page/OrderPage/style';
import OrderItem from 'component/OrderItem';
import {useSelector} from 'react-redux';
import ContentBox from 'component/common/ContentBox';

export default function OrderPage() {
  const cartItem = useSelector((state) => state.cartReducer.cart);

  const handleClickOrderButton = () => {};

  return (
    <S.OrderPageLayout>
      <S.HeaderSpan>주문/결제</S.HeaderSpan>
      <S.ContentLayout>
        <div>
          {cartItem.map((cartInfo) => {
            return (
              <React.Fragment key={cartInfo.id}>
                <OrderItem cartInfo={cartInfo} />
                <S.Line />
              </React.Fragment>
            );
          })}
        </div>
        <div>
          <ContentBox
            headerText="결제금액"
            leftContent="총 결제금액"
            rightContent={`0000원`}
            buttonText={'결제하기'}
            onClickButton={handleClickOrderButton}
          />
        </div>
      </S.ContentLayout>
    </S.OrderPageLayout>
  );
}

OrderPage.propTypes = {};
