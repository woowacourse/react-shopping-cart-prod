import Button from 'components/Common/Button/Button';
import { useEffect } from 'react';
import useWithdrawal from './hooks';
import useSnackBar from 'hooks/useSnackBar';
import * as Styled from './style';

const Withdrawal = () => {
  const { handleWithdrawal, isSucceed, isError } = useWithdrawal();
  const { showSuccessSnackBar, showErrorSnackBar } = useSnackBar();

  useEffect(() => {
    if (isSucceed) {
      showSuccessSnackBar('회원 탈퇴가 되었습니다.');
      return;
    }

    if (isError) {
      showErrorSnackBar('잠시 후에 다시 시도해주세요.');
    }
  }, [isSucceed, isError]);

  return (
    <Styled.Wrapper>
      <Styled.Message>
        정말 탈퇴 하실 건가요? 🥺
        <br />
        땅을 치고 후회 하실 준비 되셨나요?
      </Styled.Message>

      <Button colorType="tertiary" onClick={handleWithdrawal}>
        탈퇴
      </Button>
    </Styled.Wrapper>
  );
};

export default Withdrawal;
