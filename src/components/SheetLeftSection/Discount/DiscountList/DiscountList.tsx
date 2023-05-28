import styled from 'styled-components';
import DiscountItem from './DiscountItem/DiscountItem';
import { DiscountType } from 'types/discount';

const DiscountList = () => {
  const discountType: DiscountType[] = ['포인트'];

  return (
    <DiscountItemFlex>
      {discountType.map((type) => (
        <DiscountItem key={type} type={type} />
      ))}
    </DiscountItemFlex>
  );
};

export default DiscountList;

const DiscountItemFlex = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin-bottom: 20px;
`;
