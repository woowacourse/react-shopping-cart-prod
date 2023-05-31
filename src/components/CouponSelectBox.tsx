import { useState } from "react";
import styled from "styled-components";
import { ArrowDownIcon } from "../assets";
import { CouponType } from "../types/domain";

export const CouponSelectBox = ({
  coupons,
  onSelectHandler,
}: {
  coupons: CouponType[];
  onSelectHandler: (index: number) => void;
}) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [coupon, setCoupon] = useState<string | null>(null);

  const handleCouponClicked = (coupon: string, index: number) => () => {
    onSelectHandler(index);
    setCoupon(coupon);
    setIsOpen(false);
  };

  return (
    <Wrapper>
      <TitleContainer $isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <p>{coupon ? coupon : "쿠폰적용하기"}</p>
        <img src={ArrowDownIcon} alt="화살표" />
      </TitleContainer>
      {isOpen &&
        coupons.map((coupon, index) => (
          <CouponContainer
            key={coupon.id}
            onClick={handleCouponClicked(coupon.name, index)}
            $isAvailable={coupon.isAvailable}
          >
            <NameBox>{coupon.name}</NameBox>
            <MinPriceBox>
              {coupon.minPrice.toLocaleString()}원 이상 주문 시
            </MinPriceBox>
            <DiscountPriceBox>
              -{coupon.discountPrice.toLocaleString()}원
            </DiscountPriceBox>
          </CouponContainer>
        ))}
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

const TitleContainer = styled.div<{ $isOpen: boolean }>`
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
    transform: ${(props) => props.$isOpen && "rotate(-180deg)"};
    transition: all 0.3s linear;
  }
`;

const CouponContainer = styled.div<{ $isAvailable: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  width: 100%;
  height: 85px;

  position: relative;
  border-bottom: 1px solid #dddddd;

  &:hover {
    opacity: 60%;
  }

  &:active {
    transform: scale(0.95);
  }

  background: ${(props) => (props.$isAvailable ? "white" : "#dddddd")};
  color: ${(props) => (props.$isAvailable ? "var(--dark-gray)" : "white")};
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
