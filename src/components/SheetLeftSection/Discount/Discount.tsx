import FlexBox from 'components/@common/FlexBox';
import styled from 'styled-components';
import DiscountList from './DiscountList/DiscountList';

const Discount = () => {
  return (
    <>
      <CheckBoxTab></CheckBoxTab>
      <Title>쿠폰/할인</Title>
      <DiscountList />
    </>
  );
};

export default Discount;

const CheckBoxTab = styled(FlexBox)`
  top: 80px;
  z-index: 10;
  width: 100%;
  height: 60px;
  padding-bottom: 10px;
`;

const Title = styled.h4`
  width: 100%;
  font-size: 20px;
  overflow: hidden;
  margin-bottom: 20px;
`;
