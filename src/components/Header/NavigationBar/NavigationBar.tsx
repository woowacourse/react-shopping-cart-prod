import { useNavigate } from 'react-router-dom';
import { ServerSelectBox } from '../ServerSelectBox';
import * as S from './NavigationBar.style';
import { useRecoilValue, useSetRecoilState } from 'recoil';
import { cartCountSelector } from '../../../recoil/cartAtoms';
import { serverState } from '../../../recoil/serverAtom';
import useGetQuery from '../../../hooks/useGetQuery';
import { Point } from '../../../types/types';
import { fetchMemberPoint } from '../../../api/fetcher';
import { PAGE_PATH } from '../../../constants/path';
import NavCartIcon from '../../../assets/nav-cart.svg';
import NavOrderListIcon from '../../../assets/list.svg';
import { UserSelector } from '../UserSelector';
import { memberAuthorization, memberPointState } from '../../../recoil/userAtoms';

function NavigationBar() {
  const navigate = useNavigate();
  const cartCount = useRecoilValue(cartCountSelector);
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
      <S.CartWrapper onClick={() => navigate(PAGE_PATH.CART)}>
        <S.Logo>
          <S.CartIcon src={NavCartIcon} />
          <S.LogoTitle>장바구니</S.LogoTitle>
        </S.Logo>
        {cartCount !== 0 && (
          <S.CartCountWrapper>
            <S.CartCount>{cartCount}</S.CartCount>
          </S.CartCountWrapper>
        )}
      </S.CartWrapper>
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
