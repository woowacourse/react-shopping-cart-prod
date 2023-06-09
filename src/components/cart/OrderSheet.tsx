import { useEffect, useState } from 'react';
import { useRecoilValue } from 'recoil';
import { css, styled } from 'styled-components';
import { COUPON_NULL, DELIVERY_FEE, ROUTE_PATH } from '../../constants';
import { COUPON_URL, ORDER_URL } from '../../constants/url';
import useFetchData from '../../hooks/useFetchData';
import { useGoToAnotherPage } from '../../hooks/useGoToAnotherPage';
import { selectedCartItems, serverState, totalPriceSelector } from '../../recoil';
import { Coupon } from '../../types';
import Button from '../common/Button';
import Price from '../Price';

const OrderSheet = () => {
  const totalPrice = useRecoilValue(totalPriceSelector);
  const selectedItems = useRecoilValue(selectedCartItems);
  const server = useRecoilValue(serverState);
  const goToPage = useGoToAnotherPage();

  const { api, isLoading } = useFetchData();
  const [coupons, setCoupons] = useState<Coupon[]>([]);

  const [checkedCoupon, setCheckedCoupon] = useState(COUPON_NULL);
  const handleChangeCoupon: React.ChangeEventHandler<HTMLInputElement> = ({ target: { id } }) => {
    setCheckedCoupon(Number(id));
  };

  const isEmpty = totalPrice === 0;

  const discountPrice = coupons.find(({ id }) => checkedCoupon === id)?.priceDiscount ?? 0;
  const paymentPrice = totalPrice + DELIVERY_FEE - discountPrice > 0 ? totalPrice + DELIVERY_FEE - discountPrice : 0;

  const orderSelectedItems = () => {
    if (window.confirm('주문하시겠습니까?')) {
      api
        .post(`${server}${ORDER_URL}`, {
          cartItemIdList: selectedItems,
          totalPrice,
          deliveryFee: DELIVERY_FEE,
          couponId: checkedCoupon !== COUPON_NULL ? checkedCoupon : null,
        })
        .then(() => {
          alert('주문이 완료되었습니다!');
          goToPage(ROUTE_PATH.ORDER_PAGE);
        })
        .catch((error) => alert(error));
    }
  };

  useEffect(() => {
    api
      .get(`${server}${COUPON_URL}`)
      .then((data) => {
        setCoupons(data);
      })
      .catch(() => {
        setCoupons([]);
        alert('서버에서 쿠폰을 가져오지 못하였습니다.');
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [server]);

  if (isLoading) return null;

  return (
    <div>
      <StyledFieldset role="radiogroup" aria-labelledby="rg-label">
        <StyledLegend id="rg-label">쿠폰 선택하기</StyledLegend>
        <div>
          <RadioInput
            type="radio"
            id={String(COUPON_NULL)}
            name="쿠폰 적용 안함"
            value="쿠폰 적용 안함"
            checked={checkedCoupon === COUPON_NULL}
            onChange={handleChangeCoupon}
          />
          <StyledLabel htmlFor={String(COUPON_NULL)}>쿠폰 적용 안함</StyledLabel>
        </div>
        {coupons.map(({ name, id }) => (
          <div>
            <RadioInput
              type="radio"
              id={String(id)}
              name={name}
              value={name}
              checked={checkedCoupon === id}
              onChange={handleChangeCoupon}
            />
            <StyledLabel htmlFor={String(id)}>{name}</StyledLabel>
          </div>
        ))}
      </StyledFieldset>
      <StyledSection>
        <Title>결제 금액</Title>
        <List>
          <Price price={totalPrice} tag="li" description="상품금액" />
          <Price price={DELIVERY_FEE} tag="li" description="배송비" />
          {discountPrice > 0 && <Price price={-discountPrice} tag="li" description="할인금액" />}
          <Price price={paymentPrice} tag="li" description="총 결제금액" />
        </List>
        <Button css={orderButtonStyle} onClick={orderSelectedItems} disabled={isEmpty}>
          주문하기
        </Button>
      </StyledSection>
    </div>
  );
};

const StyledSection = styled.section`
  max-width: 448px;
  max-height: 410px;
  margin-top: 40px;
  padding-bottom: 38px;
  border: 1px solid var(--gray-color-300);
`;

const Title = styled.h3`
  padding: 24px 30px;
  margin-bottom: 44px;
  border-bottom: 1px solid var(--gray-color-300);
  font-size: 20px;

  @media (max-width: 548px) {
    margin-bottom: 32px;
    font-size: 18px;
  }
`;

const List = styled.ul`
  & > li {
    display: flex;
    justify-content: space-between;
    margin: 0 30px 20px;
    font-size: 18px;
    font-weight: 600;

    & span {
      font-weight: 500;
    }

    &:last-child {
      margin: 42px 30px 54px;
    }

    @media (max-width: 548px) {
      flex-direction: column;
      font-size: 15px;
      font-weight: 600;
      text-align: center;
      line-height: 1.4;

      &:last-child {
        margin: 32px 30px 34px;
      }
    }
  }
`;

const orderButtonStyle = css`
  width: calc(100% - 60px);
  padding: 26px 120px;
  margin: 0 30px;
  background-color: var(--text-color);
  font-size: 22px;
  color: #fff;

  @media (max-width: 548px) {
    padding: 20px 10px;
    font-size: 16px;
  }

  :disabled {
    background-color: var(--highlight-color);
  }
`;

const StyledFieldset = styled.fieldset`
  height: 165px;
  overflow: scroll;
  border: 1px solid var(--gray-color-300);
  padding: 15px 20px;

  & > div {
    margin-top: 10px;
  }

  & > div:nth-child(2) {
    margin: 0;
  }

  & > div > label {
    margin-left: 5px;
  }

  @media (max-width: 548px) {
    margin-top: 32px;
    font-size: 18px;
  }
`;

const StyledLegend = styled.legend`
  padding: 0 10px;
  font-size: 20px;
`;

const RadioInput = styled.input`
  vertical-align: middle;
  appearance: none;
  border: max(2px, 0.1em) solid gray;
  border-radius: 50%;
  width: 1.25em;
  height: 1.25em;
  transition: border 0.4s ease-in-out;

  &:checked {
    border: 0.4em solid var(--text-color);
  }

  &:hover {
    box-shadow: 0 0 0 max(4px, 0.2em) lightgray;
    cursor: pointer;
  }

  &:focus-visible {
    outline-offset: max(2px, 0.1em);
    outline: max(2px, 0.1em) dotted var(--text-color);
  }

  &:disabled {
    background-color: lightgray;
    box-shadow: none;
    opacity: 0.7;
    cursor: not-allowed;
  }

  &:disabled + label {
    opacity: 0.7;
    cursor: not-allowed;
  }
`;

const StyledLabel = styled.label`
  @media (max-width: 548px) {
    font-size: 15px;
  }
`;

export default OrderSheet;
