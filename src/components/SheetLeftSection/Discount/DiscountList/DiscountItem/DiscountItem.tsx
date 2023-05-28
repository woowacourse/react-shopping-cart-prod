import FlexBox from 'components/@common/FlexBox';
import styled from 'styled-components';
import { DiscountType } from 'types/discount';

type DiscountItemProps = {
  type: DiscountType;
};

const DiscountItem = ({ type }: DiscountItemProps) => {
  return (
    <FlexBox flexDirection="column" justify="flex-start" align="flex-start" gap="8px" role="list">
      <DiscountMessageSection>
        <Message>{`사용가능한 ${type}가 있습니다`}</Message>
        <Button>할인 적용하기</Button>
      </DiscountMessageSection>
    </FlexBox>
  );
};

const DiscountMessageSection = styled.div`
  width: 100%;
  font-size: 14px;
  color: blue;

  display: flex;
  flex-direction: row;
  -webkit-box-align: center;
  align-items: center;
  -webkit-box-pack: justify;
  justify-content: space-between;
`;

const Message = styled.span`
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.2px;
  font-weight: 500;
  color: rgb(26, 124, 255);
`;

const Button = styled.button`
  margin: 0px;
  outline: none;
  appearance: none;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;
  cursor: pointer;
  border-radius: 2px;
  box-sizing: border-box;
  background: rgb(255, 255, 255);
  border: 1px solid rgba(0, 0, 0, 0.1);
  color: rgb(24, 26, 28);
  font-size: 14px;
  font-weight: 400;
  height: 40px;
  padding: 0px 16px;
`;

export default DiscountItem;
