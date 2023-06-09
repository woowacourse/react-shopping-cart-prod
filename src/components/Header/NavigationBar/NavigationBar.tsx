import { useNavigate } from 'react-router-dom';
import { ServerSelectBox } from './ServerSelectBox';
import * as S from './NavigationBar.style';
import { useRecoilState, useRecoilValue } from 'recoil';
import { serverState } from '../../../recoil/serverAtom';
import useGetQuery from '../../../hooks/useGetQuery';
import { Point } from '../../../types/types';
import { fetchMemberPoint } from '../../../api/fetcher';
import { PAGE_PATH } from '../../../constants';
import NavOrderListIcon from '../../../assets/list.svg';
import { UserSelector } from './UserSelector';
import { memberAuthorization, memberPointState } from '../../../recoil/userAtoms';
import { CartBox } from './CartBox';
import { useEffect } from 'react';

function NavigationBar() {
  const navigate = useNavigate();
  const memberAuth = useRecoilValue(memberAuthorization);
  const server = useRecoilValue(serverState);
  const [memberPoint, setMemberPoint] = useRecoilState(memberPointState);
  const { getData: getPoint, loading } = useGetQuery<Point>({
    fetcher: () => fetchMemberPoint({ server, auth: memberAuth }),
    onSuccess: (point) => setMemberPoint(point),
  });

  useEffect(() => {
    const refreshPoint = async () => {
      await getPoint();
    };
    refreshPoint();
  }, [server, memberAuth]);

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
      {loading && <S.SkeletonUserSelector />}
      {!loading && memberPoint && <UserSelector point={memberPoint} />}
    </S.NavBar>
  );
}

export default NavigationBar;
