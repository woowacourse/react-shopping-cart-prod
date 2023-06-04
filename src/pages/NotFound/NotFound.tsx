import { useNavigate } from 'react-router-dom';
import { PAGE_PATH } from '../../constants/path';
import * as S from './NotFound.style';

function NotFound() {
  const navigate = useNavigate();

  return (
    <S.Wrapper>
      <S.Summary>페이지를 찾을 수 없습니다.</S.Summary>
      <S.Description>
        페이지의 주소가 잘못 입력되었거나, <br />
        변경 혹은 삭제되어 요청하신 페이지를 찾을 수 없습니다.
      </S.Description>
      <S.Description> 입력하신 페이지 주소를 다시 한번 확인해 주세요.</S.Description>
      <S.HomeButton onClick={() => navigate(PAGE_PATH.HOME)}>홈으로 돌아가기</S.HomeButton>
    </S.Wrapper>
  );
}

export default NotFound;
