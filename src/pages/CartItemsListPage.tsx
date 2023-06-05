import { Suspense } from 'react';
import { useRecoilValue } from 'recoil';
import styled from 'styled-components';

import EstimatedPaymentBox from '../components/Cart/EstimatedPaymentBox';
import CheckBox from '../components/Common/CheckBox';
import Button from '../components/Common/Button';
import ContentListSkeleton from '../components/Common/ContentListSkeleton';
import CartProductList from '../components/Cart/CartProductList';

import { totalCartProductSelect } from '../recoil/cartItemData';
import { checkedListSelector } from '../recoil/checkedCartItemData';
import useCheckedProducts from '../hooks/useCheckedProducts';

const CartItemsListPage = () => {
  const totalCartProductCount = useRecoilValue(totalCartProductSelect);
  const checkedCartProductCount = useRecoilValue(checkedListSelector);
  const { removeCheckedProducts, handleAllCheckedProducts } =
    useCheckedProducts();

  return (
    <Main>
      <CartProductTitle>장바구니</CartProductTitle>
      <CartProductContent>
        <CartProductInfo>
          <CartProductListTitle>
            든든배송 상품 ({totalCartProductCount}개)
          </CartProductListTitle>
          <Suspense fallback={<ContentListSkeleton content='cart' />}>
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
              designtype='delete'
              buttonLabel='선택삭제'
              onClick={removeCheckedProducts}
            />
          </SelectContainer>
        </CartProductInfo>
      </CartProductContent>
      <PaymentWrapper>
        <EstimatedPaymentBox />
      </PaymentWrapper>
    </Main>
  );
};

const Main = styled.main`
  position: relative;
  display: flex;
  justify-content: space-between;
  max-width: 1300px;
  height: calc(100vh - 80px);
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

const CartProductTitle = styled.div`
  position: absolute;
  width: 100%;
  height: 130px;
  padding: 58px 0 29px 0;
  border-bottom: 4px solid ${({ theme }) => theme.colors.black};
  text-align: center;
  font-size: 32px;
  font-weight: 700;
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

const PaymentWrapper = styled.div`
  position: sticky;
  top: 30px;
  margin-top: 170px;

  @media (max-width: 1100px) {
    position: static;
    display: flex;
    justify-content: center;
    margin-top: 0;
  }
`;

export default CartItemsListPage;
