import { Point, getUserPoints } from 'apis/members';
import FlexBox from 'components/@common/FlexBox';
import Spinner from 'components/@common/Loader';
import useModal from 'components/@common/Modal/hooks/useModal';
import DiscountModal from 'components/DiscountModal/DiscountModal';
import useFetch from 'hooks/useFetch';
import { useRecoilValue } from 'recoil';
import { pointUsageState } from 'state/pointUsageState';
import styled from 'styled-components';
import { DiscountType } from 'types/discount';
import ReloadRequestUI from 'ReloadRequestUI';

type DiscountItemProps = {
  type: DiscountType;
};

const DiscountItem = ({ type }: DiscountItemProps) => {
  const { isModalOpen, openModal, closeModal } = useModal();
  const appliedPoint = useRecoilValue(pointUsageState);

  const {
    data: pointData,
    isLoading: isPointLoading,
    errorState: pointError,
    fetchData: fetchUserPoints,
  } = useFetch<Point>(getUserPoints);
  const userPoint = pointData?.point ?? 0;

  const applyDiscount = () => {
    console.log('할인 적용');
  };

  if (isPointLoading || pointError?.isError) {
    return isPointLoading ? (
      <FlexBox flexDirection="column" justify="center" align="center" gap="8px" role="button">
        <Spinner />
      </FlexBox>
    ) : (
      <ReloadRequestUI reloadFunction={fetchUserPoints} />
    );
  }

  return (
    <FlexBox flexDirection="column" justify="flex-start" align="flex-start" gap="8px" role="list">
      <DiscountMessageSection>
        {appliedPoint.appliedPoint > 0 ? (
          <Message error="error">{appliedPoint.appliedPoint}원 할인이 적용되었습니다.</Message>
        ) : (
          <Message>사용 가능한 {type}가 있습니다.</Message>
        )}
        <Button onClick={openModal}>{appliedPoint.appliedPoint > 0 ? `할인 변경하기` : `할인 적용하기`}</Button>

        <DiscountModal
          userPoint={userPoint}
          isOpen={isModalOpen}
          closeModal={closeModal}
          onClickConfirmButton={applyDiscount}
        />
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

const Message = styled.span<{ error?: string }>`
  font-size: 14px;
  line-height: 20px;
  letter-spacing: -0.2px;
  font-weight: 500;
  color: ${(props) => (props.error ? 'red' : 'blue')};
`;

const Button = styled.button`
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
