import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import userThunk from 'store/user/thunk';

import { PAGE_LIST } from 'constants/';
import ApiServer from 'lib/backendSelectUtils';

import * as S from './styles';

function BackendSelect() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickItem = (hostname) => () => {
    if (confirm('백엔드 API를 변경하시겠습니까?\n현재 서비스에서 로그아웃 처리됩니다.') === false) {
      return;
    }

    dispatch(userThunk.userLogout());
    ApiServer.setApiServer(hostname);

    navigate(PAGE_LIST.HOME);
  };

  return (
    <S.Container direction="column">
      <S.Item onClick={onClickItem('jojogreen.compy.life')}>
        <S.Icon>🌴</S.Icon>
        <S.Name>조조그린</S.Name>
      </S.Item>

      <S.Item onClick={onClickItem('hunch.compy.life')}>
        <S.Icon>🍻</S.Icon>
        <S.Name>헌치</S.Name>
      </S.Item>

      <S.Item onClick={onClickItem('yukong.compy.life')}>
        <S.Icon>🫘</S.Icon>
        <S.Name>유콩</S.Name>
      </S.Item>

      <S.Item onClick={onClickItem('river.compy.life')}>
        <S.Icon>🌊</S.Icon>
        <S.Name>리버</S.Name>
      </S.Item>
    </S.Container>
  );
}

export default BackendSelect;
