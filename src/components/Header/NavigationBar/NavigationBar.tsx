import { useNavigate } from 'react-router-dom';
import { ServerSelectBox } from './ServerSelectBox';
import * as S from './NavigationBar.style';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { serverState } from '../../../recoil/serverAtom';
import useGetQuery from '../../../hooks/useGetQuery';
import { Point } from '../../../types/types';
import { fetchMemberPoint } from '../../../api/fetcher';
import { PAGE_PATH } from '../../../constants/path';
import NavOrderListIcon from '../../../assets/list.svg';
import { UserSelector } from './UserSelector';
import { memberAuthorization, memberPointState } from '../../../recoil/userAtoms';
import { CartBox } from './CartBox';

function NavigationBar() {
  const navigate = useNavigate();
  const memberAuth = useRecoilValue(memberAuthorization);
  const server = useRecoilValue(serverState);
  const setMemberPoint = useSetRecoilState(memberPointState);
  const { data: point } = useGetQuery<Point>({
    fetcher: fetchMemberPoint({ server, auth: memberAuth }),
    onSuccess: (point) => setMemberPoint(point),
  });

  return (
    <S.NavBar>
      <ServerSelectBox />
      <CartBox />
      <S.OrderListButton onClick={() => navigate(PAGE_PATH.ORDER)}>
        <S.Logo>
          <S.OrderListIcon src={NavOrderListIcon} />
          <S.LogoTitle>주문목록</S.LogoTitle>
        </S.Logo>
      </S.OrderListButton>
      {point && <UserSelector point={point} />}
    </S.NavBar>
  );
}

export default NavigationBar;
