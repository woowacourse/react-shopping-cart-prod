import { useState } from "react";
import styled from "styled-components";
import { ArrowDownIcon } from "../assets";
import { NONE_SELECTED_INDEX } from "../constants";
import { MyCouponType } from "../types/domain";

interface CouponSelectBoxType {
  type: "get" | "apply";
  coupons: MyCouponType[];
  onSelectHandler: (index: number) => void;
}

const TITLE_GET = "발급 가능한 쿠폰";
const TITLE_APPLY = "쿠폰 적용하기";

export const CouponSelectBox = ({
  type,
  coupons,
  onSelectHandler,
}: CouponSelectBoxType) => {
  const defaultTitle = type === "get" ? TITLE_GET : TITLE_APPLY;
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [couponTitle, setCouponTitle] = useState<string>(defaultTitle);

  const handleCouponClicked = (couponTitle: string, index: number) => () => {
    onSelectHandler(index);
    setCouponTitle(couponTitle);
    setIsOpen(false);
  };

  const handleTitleClicked = () => {
    setIsOpen(!isOpen);

    if (type === "get") {
      onSelectHandler(NONE_SELECTED_INDEX);
      setCouponTitle(TITLE_GET);
    }
  };

  return (
    <Wrapper>
      <TitleContainer $isOpen={isOpen} onClick={handleTitleClicked}>
        <p>{couponTitle}</p>
        <img src={ArrowDownIcon} alt="화살표" />
      </TitleContainer>
      {isOpen && (
        <>
          {coupons.map((coupon, index) => {
            return type === "apply" ? (
              <CouponContainer
                key={coupon.id}
                onClick={handleCouponClicked(coupon.name, index)}
                $isAvailable={coupon.isAvailable}
                disabled={!coupon.isAvailable}
              >
                <NameBox>{coupon.name}</NameBox>
                <MinPriceBox>
                  {coupon.minOrderPrice.toLocaleString()}원 이상 주문시
                </MinPriceBox>
                {coupon.isAvailable ? (
                  <DiscountPriceBox>
                    -{coupon.discountPrice.toLocaleString()}원
                  </DiscountPriceBox>
                ) : (
                  <DiscountPriceBox>적용불가</DiscountPriceBox>
                )}
              </CouponContainer>
            ) : (
              <CouponContainer
                key={coupon.id}
                onClick={handleCouponClicked(coupon.name, index)}
                $isAvailable={true}
              >
                <NameBox>{coupon.name}</NameBox>
                <MinPriceBox>
                  {coupon.minOrderPrice.toLocaleString()}원 이상 주문 시
                </MinPriceBox>
              </CouponContainer>
            );
          })}
          {type === "apply" && (
            <NotAppliedCouponBox
              onClick={handleCouponClicked(TITLE_APPLY, NONE_SELECTED_INDEX)}
            >
              쿠폰적용안함
            </NotAppliedCouponBox>
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

  max-width: 480px;
  width: 350px;

  border: 1px solid #dddddd;
  border-bottom: none;

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

const CouponContainer = styled.button<{ $isAvailable: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 20px;
  width: 100%;
  height: 85px;

  position: relative;
  border-bottom: 1px solid #dddddd;

  &:not(:disabled) {
    cursor: pointer;
  }

  &:not(:disabled):hover {
    opacity: 60%;
  }

  &:not(:disabled):active {
    transform: scale(0.95);
  }

  transition: all 0.3s ease;
  background: ${(props) => (props.$isAvailable ? "white" : "#dddddd")};
  color: ${(props) => (props.$isAvailable ? "var(--dark-gray)" : "white")};
`;

const NotAppliedCouponBox = styled.div`
  width: 100%;
  height: 60px;

  padding: 20px;
  border-bottom: 1px solid #dddddd;

  cursor: pointer;
  &:hover {
    opacity: 60%;
  }

  &:active {
    transform: scale(0.95);
  }
  transition: all 0.3s ease;
`;

const DiscountPriceBox = styled.div`
  position: absolute;
  bottom: 15px;
  right: 20px;

  font-size: 20px;
  font-weight: 500;
`;

const NameBox = styled.p`
  font-weight: 600;
  font-size: 19px;
`;

const MinPriceBox = styled.p`
  font-weight: 500;
  font-size: 14px;
`;
