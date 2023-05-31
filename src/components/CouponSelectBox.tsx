import { useState } from "react";
import { useRecoilValue } from "recoil";
import styled, { keyframes } from "styled-components";
import { ArrowDownIcon } from "../assets";

// {
//   id,
//   name,
//   minPrice,
//   isAvailable,
//   discountPrice,
// }: CouponType

export const CouponSelectBox = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Wrapper>
      <TitleContainer $isOpen={isOpen} onClick={() => setIsOpen(!isOpen)}>
        <p>쿠폰적용하기</p>
        <img src={ArrowDownIcon} alt="화살표" />
      </TitleContainer>
      {isOpen && (
        <>
          <CouponContainer>
            <NameBox>반짝할인 10% 할인 쿠폰</NameBox>
            <MinPriceBox>10,000원 이상 주문 시</MinPriceBox>
            <DiscountPriceBox>-600,000원</DiscountPriceBox>
          </CouponContainer>
          <CouponContainer>
            <NameBox>반짝할인 30% 할인 쿠폰</NameBox>
            <MinPriceBox>30,000원 이상 주문 시</MinPriceBox>
            <DiscountPriceBox>-3,000,000원</DiscountPriceBox>
          </CouponContainer>
          <CouponContainer>
            <NameBox>배송비 무료 쿠폰</NameBox>
            <MinPriceBox>50,000원 이상 주문 시</MinPriceBox>
            <DiscountPriceBox>-3,000원</DiscountPriceBox>
          </CouponContainer>
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

const CouponContainer = styled.div`
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

  // disabled 된 쿠폰 css
  /* background: #dddddd;
  color: var(--gray); */
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
