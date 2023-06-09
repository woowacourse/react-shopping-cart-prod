import FlexBox from 'components/@common/FlexBox';
import styled from 'styled-components';
import { ReactComponent as Refresh } from 'assets/refresh-button.svg';

const ReloadRequestUI = ({ reloadFunction }: any) => {
  return (
    <StyledFlexBox>
      <ButtonContainer>
        <RequestMessage>잠시후 다시 요청해주세요</RequestMessage>
        <Refresh onClick={reloadFunction} />
      </ButtonContainer>
    </StyledFlexBox>
  );
};

export default ReloadRequestUI;

const StyledFlexBox = styled(FlexBox)`
  flex: 1;
`;

const RequestMessage = styled.div`
  font-size: 14px;
  font-weight: bold;
`;

const ButtonContainer = styled.div`
  gap: 12px;
  justify-content: center;
  align-items: center;
  display: flex;
  flex-direction: column;
`;
