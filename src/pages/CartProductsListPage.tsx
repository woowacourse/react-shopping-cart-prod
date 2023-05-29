import { Suspense } from 'react';
import styled from 'styled-components';

import EstimatedPaymentBox from '../components/Cart/EstimatedPaymentBox';
import CheckBox from '../components/Common/CheckBox';
import Button from '../components/Common/Button';
import ContentListSkeleton from '../components/Common/ContentListSkeleton';
import CartProductList from '../components/Cart/CartProductList';
import UserPointInfo from '../components/Cart/UserPointInfo';
import { useRecoilValue } from 'recoil';
import { totalCartProductSelect } from '../recoil/cartProductData';
import { checkedListSelector } from '../recoil/checkedProductData';
import useCheckedProducts from '../hooks/useCheckedProducts';
import usePoint from '../hooks/usePoint';
import Title from '../components/Common/Title';

const CartProductsListPage = () => {
  const totalCartProductCount = useRecoilValue(totalCartProductSelect);
  const checkedCartProductCount = useRecoilValue(checkedListSelector);
  const { removeCheckedProducts, handleAllCheckedProducts } =
    useCheckedProducts();
  const { userUsedPoint, handleUserUsedPointUpdate } = usePoint();

  return (
    <Main>
      <CartProductTitle>장바구니</CartProductTitle>
      <CartProductContent>
        <CartProductInfo>
          <CartProductListTitle>
            든든배송 상품 ({totalCartProductCount}개)
          </CartProductListTitle>
          <Suspense fallback={<ContentListSkeleton content='product' />}>
            <CartProductList />
          </Suspense>
          <SelectContainer>
            <CheckBox
              onChange={handleAllCheckedProducts}
              checked={totalCartProductCount === checkedCartProductCount}
            />
            <TotalSelectedCount>
              전체선택 ({checkedCartProductCount}/{totalCartProductCount})
            </TotalSelectedCount>
            <Button
              designType='delete'
              buttonLabel='선택삭제'
              onClick={removeCheckedProducts}
            />
          </SelectContainer>
        </CartProductInfo>
      </CartProductContent>
      <PaymentBoxWrapper>
        <UserPointInfo onUserUsedPointUpdate={handleUserUsedPointUpdate} />
        <EstimatedPaymentBox userUsedPoint={userUsedPoint} />
      </PaymentBoxWrapper>
    </Main>
  );
};

const Main = styled.main`
  position: relative;
  display: flex;
  justify-content: space-between;
  max-width: 1300px;
  margin: 0 auto;
  padding: 0 0 100px 0;
  overflow-y: auto;

  &::-webkit-scrollbar {
    display: none;
  }

  @media (max-width: 1100px) {
    flex-direction: column;
    margin: 0 20px;
  }
`;

const CartProductTitle = styled(Title)`
  position: absolute;
`;

const CartProductContent = styled.div`
  padding-top: 130px;
`;

const CartProductInfo = styled.div`
  display: flex;
  flex-direction: column;
`;

const CartProductListTitle = styled.div`
  padding: 34px 0 16px 0;
  font-size: 20px;
`;

const SelectContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 100px;
`;

const TotalSelectedCount = styled.span`
  padding: 0 13px;
`;

const PaymentBoxWrapper = styled.div`
  position: sticky;
  top: 30px;
  margin-top: 170px;

  @media (max-width: 1100px) {
    position: static;
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-top: 0;
  }
`;

export default CartProductsListPage;
