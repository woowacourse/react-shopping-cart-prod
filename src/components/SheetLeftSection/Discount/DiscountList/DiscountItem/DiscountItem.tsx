import FlexBox from 'components/@common/FlexBox';
import useModal from 'components/@common/Modal/hooks/useModal';
import DiscountModal from 'components/DiscountModal/DiscountModal';
import { useRecoilValue } from 'recoil';
import { pointUsageState } from 'state/pointUsageState';
import styled from 'styled-components';
import { DiscountType } from 'types/discount';

type DiscountItemProps = {
  type: DiscountType;
};

const DiscountItem = ({ type }: DiscountItemProps) => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const appliedPoint = useRecoilValue(pointUsageState);

  const applyDiscount = () => {
    console.log('할인 적용');
  };

  return (
    <FlexBox flexDirection="column" justify="flex-start" align="flex-start" gap="8px" role="list">
      <DiscountMessageSection>
        <div>
          {appliedPoint.appliedPoint > 0 ? (
            <Message style={{ color: 'red' }}>{appliedPoint.appliedPoint}원 할인이 적용되었습니다.</Message>
          ) : (
            <Message>사용가능한 {type}가 있습니다</Message>
          )}
        </div>
        <Button onClick={openModal}>{appliedPoint.appliedPoint > 0 ? `할인 변경하기` : `할인 적용하기`}</Button>
        <DiscountModal isOpen={isModalOpen} closeModal={closeModal} onClickConfirmButton={() => applyDiscount} />
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
