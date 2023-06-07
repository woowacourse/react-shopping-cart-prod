import { useState } from 'react';
import styled from 'styled-components';
import { ArrowDownIcon } from '../../assets';
import { Coupon } from '../../types/domain';

interface CouponContainerProps {
  available: string;
}

export const CouponSelectBox = ({
  coupons,
  setSelectedCoupon,
}: {
  coupons: Coupon[];
  setSelectedCoupon: React.Dispatch<React.SetStateAction<Coupon>>;
}) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Wrapper>
      <TitleContainer isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <p>쿠폰적용하기</p>
        <img src={ArrowDownIcon} alt="화살표" />
      </TitleContainer>
      {isOpen && (
        <>
          {coupons.length === 0 ? (
            <CouponContainer available="false" disabled>
              쿠폰이 없습니다.
            </CouponContainer>
          ) : (
            coupons.map((coupon) => {
              return (
                <CouponContainer
                  key={coupon.id}
                  available={coupon.isAvailable.toString()}
                  onClick={() => setSelectedCoupon(coupon)}
                  disabled={!coupon.isAvailable}
                >
                  <NameBox>{coupon.name}</NameBox>
                  <ExpiredDateBox>만료기한 : {coupon.expiredAt}</ExpiredDateBox>
                  <MinPriceBox>{coupon.minOrderPrice.toLocaleString()}원 이상 주문 시</MinPriceBox>
                  <DiscountPriceBox>
                    {coupon.discountPrice
                      ? `${coupon.discountPrice.toLocaleString()}원`
                      : '사용불가'}
                  </DiscountPriceBox>
                </CouponContainer>
              );
            })
          )}
        </>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;

  max-width: 380px;
  width: 350px;

  margin-top: 35px;
  border: 1px solid #dddddd;
  border-bottom: none;

  cursor: pointer;

  @media screen and (max-width: 300px) {
    width: 290px;
  }
`;

const TitleContainer = styled.div<{ isOpen: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  height: 55px;

  font-size: 17px;
  text-align: start;
  padding: 0 20px;
  border-bottom: 3px solid #dddddd;

  & > img {
    transform: ${(props) => props.isOpen && 'rotate(-180deg)'};
    transition: all 0.3s linear;
  }
`;

const CouponContainer = styled.button<CouponContainerProps>`
  display: flex;
  flex-direction: column;
  gap: 5px;
  padding: 15px;
  width: 100%;
  height: 85px;

  position: relative;
  border-bottom: 1px solid #dddddd;

  &:hover {
    opacity: 60%;
  }

  &:active {
    transform: ${(props) => (props.available === 'true' ? 'scale(0.95)' : 'scale(1)')};
  }

  background: ${(props) => (props.available === 'true' ? '#ffffff' : '#dddddd')};
  color: ${(props) => (props.available === 'true' ? '#000000' : '#333333')};

  cursor: pointer;
`;

const DiscountPriceBox = styled.div`
  position: absolute;
  bottom: 15px;
  right: 20px;

  font-size: 20px;
  font-weight: 500;
  color: var(--dark-gray);
`;

const NameBox = styled.p`
  font-weight: 600;
  font-size: 19px;
  color: var(--dark-gray);
`;

const MinPriceBox = styled.p`
  font-weight: 500;
  font-size: 14px;
  color: var(--gray);
`;

const ExpiredDateBox = styled.p`
  font-weight: 400;
  font-size: 14px;
  color: var(--dark-gray);
`;
