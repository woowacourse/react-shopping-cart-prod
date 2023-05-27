import { useRecoilState, useRecoilValue } from "recoil";
import { couponListState } from "recoil/coupon";
import { serverSelectState } from "recoil/server";
import { styled } from "styled-components";

const CouponSelector = () => {
  const couponList = useRecoilValue(couponListState);

  //   const [couponList, setcouponList] = ;
  const defaultText =
    couponList.length === 0
      ? "사용할 쿠폰이 없습니다."
      : "사용할 쿠폰을 골라주세요.";

  return (
    <Container>
      적용 쿠폰
      <Select>
        <Option>{defaultText}</Option>
        {couponList.map((coupon) => {
          if (coupon.selected) return;

          const { couponId, name, discount } = coupon;
          const unit = discount.type === "rate" ? "%" : "원";

          return (
            <Option
              key={couponId}
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
