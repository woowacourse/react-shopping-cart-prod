import { useRecoilState } from "recoil";
import { serverSelectState } from "recoil/server";
import { styled } from "styled-components";

const CouponSelector = () => {
  //   const [couponList, setcouponList] = ;

  return (
    <Container>
      적용 쿠폰
      <Select>
        <Option>1.</Option>
        <Option>2.</Option>
        <Option>3.</Option>
        <Option>4.</Option>
        <Option>5.</Option>
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
