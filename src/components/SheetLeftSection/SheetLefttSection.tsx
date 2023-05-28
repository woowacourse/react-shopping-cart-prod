import FlexBox from 'components/@common/FlexBox';
import styled from 'styled-components';
import SheetProductCardList from './SheetProductCardList/SheetProductCardList';
import Discount from './Discount/Discount';

const SheetLeftSection = () => {
  return (
    <LeftSection flexDirection="column" align="flex-start">
      <Discount />
      <SheetProductCardList />
    </LeftSection>
  );
};

export default SheetLeftSection;

const LeftSection = styled(FlexBox)`
  position: relative;
  width: 60%;
  margin-bottom: 30px;

  @media (max-width: 768px) {
    width: 100%;
  }
`;
