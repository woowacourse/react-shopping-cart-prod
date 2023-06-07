import { useNavigate } from 'react-router-dom';
import { LOCAL_STORAGE_KEY, PAGE_PATH } from '../../constants';
import * as S from './NotFound.style';
import { useSetRecoilState } from 'recoil';
import { serverState } from '../../recoil/serverAtom';

function NotFound() {
  const navigate = useNavigate();
  const setServer = useSetRecoilState(serverState);

  const resetServer = () => {
    setServer('테스트');
    localStorage.removeItem(LOCAL_STORAGE_KEY.CURRENT_MEMBER_ID);
    navigate(PAGE_PATH.HOME);
  };

  return (
    <S.Wrapper>
      <S.Summary>페이지를 찾을 수 없습니다.</S.Summary>
      <S.Description>
        페이지의 주소가 잘못 입력되었거나, <br />
        변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.
      </S.Description>
      <S.Description> 입력하신 페이지 주소를 다시 한번 확인해 주세요.</S.Description>
      <S.ButtonWrapper>
        <S.HomeButton onClick={() => navigate(PAGE_PATH.HOME)}>홈으로 돌아가기</S.HomeButton>
        <S.ResetButton onClick={resetServer}>테스트 서버로 돌아가기</S.ResetButton>
      </S.ButtonWrapper>
    </S.Wrapper>
  );
}

export default NotFound;
