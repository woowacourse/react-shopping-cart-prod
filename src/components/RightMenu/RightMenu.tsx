import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ICONS from 'constants/icons';
import Avatar from 'components/Avatar/Avatar';
import PlainLink from 'components/PlainLink/PlainLink';
import * as S from 'components/RightMenu/RightMenu.styled';
import { useDispatch, useSelector } from 'react-redux';
import { actions } from 'redux/actions';
import { PATHS } from 'constants/paths';
import { StoreState } from 'types';
import { useEffect } from 'react';

function RightMenu() {
  const dispatch = useDispatch();
  const { userId, customer } = useSelector<
    StoreState,
    StoreState['customerState']
  >(({ customerState }) => customerState);
  const [isDrawerOpened, setIsDrawerOpened] = useState(false);
  const navigate = useNavigate();

  const toggleDrawer = () => {
    setIsDrawerOpened((prev) => !prev);
  };

  const handleSignoutButton = () => {
    dispatch(actions.signOut());

    navigate(PATHS.INDEX);
  };

  useEffect(() => {
    if (userId) {
      dispatch(actions.getCustomer(userId));
    }
  }, [dispatch, userId]);

  if (customer) {
    console.log(customer);
    return (
      <S.RightMenuBox>
        <S.Nav>
          <S.Button onClick={toggleDrawer}>{ICONS.MENU}</S.Button>
          <S.Ul isDrawerOpened={isDrawerOpened}>
            <li>
              <PlainLink to="/cart">장바구니</PlainLink>
            </li>
            <li>
              <PlainLink to="/orders">주문목록</PlainLink>
            </li>
            <li>
              <PlainLink to="/profile">내 정보 수정</PlainLink>
            </li>
            <li>
              <S.LogoutButton onClick={handleSignoutButton}>
                로그아웃
              </S.LogoutButton>
            </li>
          </S.Ul>
        </S.Nav>
        <Avatar profileImageUrl={customer.profileImageUrl} />
      </S.RightMenuBox>
    );
  }

  return (
    <S.Nav>
      <S.Button onClick={toggleDrawer}>{ICONS.MENU}</S.Button>
      <S.Ul isDrawerOpened={isDrawerOpened}>
        <li>
          <PlainLink to="/cart">장바구니</PlainLink>
        </li>
        <li>
          <PlainLink to="/signin">로그인</PlainLink>
        </li>
        <li>
          <PlainLink to="/signup/1">회원가입</PlainLink>
        </li>
      </S.Ul>
    </S.Nav>
  );
}

export default RightMenu;
