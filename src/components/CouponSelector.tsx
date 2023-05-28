import { useState } from "react";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { couponListState, changeSelectSelector } from "recoil/coupon";
import { styled } from "styled-components";

interface CouponSelectorProps {
  changeCartItemCoupon: (couponId: number | undefined) => void;
}

const CouponSelector = ({ changeCartItemCoupon }: CouponSelectorProps) => {
  const [currentCouponId, setCurrentCouponId] = useState<number | undefined>();
  const setSelectedCoupon = useSetRecoilState(
    changeSelectSelector(currentCouponId)
  );

  const couponList = useRecoilValue(couponListState);

  const changeCoupon = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedCouponId = couponList[e.target.selectedIndex - 1]?.couponId;

    setSelectedCoupon(selectedCouponId);
    setCurrentCouponId(selectedCouponId);
    changeCartItemCoupon(selectedCouponId);
  };

  const defaultText =
    couponList.length === 0
      ? "사용할 쿠폰이 없습니다."
      : "사용할 쿠폰을 골라주세요.";

  return (
    <Container>
      쿠폰
      <Select onChange={changeCoupon}>
        <Option>{defaultText}</Option>
        {couponList.map((coupon) => {
          const { couponId, name, discount, selected } = coupon;
          const unit = discount.type === "rate" ? "%" : "원";

          return (
            <Option
              key={couponId}
              disabled={selected}
            >{`${name}(-${discount.amount}${unit})`}</Option>
          );
        })}
      </Select>
    </Container>
  );
};

const Container = styled.label`
  display: flex;
  align-items: center;

  font-size: 14px;
`;

const Select = styled.select`
  border: 1px solid gray;
  margin-left: 5px;
  width: 80%;
`;

const Option = styled.option``;

export default CouponSelector;
