import { MouseEventHandler, useEffect, useRef } from 'react';
import { useRecoilState } from 'recoil';
import { css, keyframes, styled } from 'styled-components';
import usePoint from '../../../hooks/usePoint';
import { RewardIcon, UserChangeIcon } from '../../../assets/svg';
import { formatPrice } from '../../../utils/formatPrice';
import useMenu from './useMenu';
import { userState } from '../../../recoil/atoms/auth';
import { DEFAULT_USER_NAME, PAIR_USER_NAME } from '../../../constants/auth';
import useOrder from '../../../hooks/useOrder';
import useCart from '../../../hooks/useCart';

const UserMenu = ({ isActive }: { isActive: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [user, setUser] = useRecoilState(userState);
  const { point, updatePoint } = usePoint();
  const { closeMenu } = useMenu();
  const { updateCart } = useCart();
  const { updateOrders } = useOrder();

  const handleChangeUserButtonClick: MouseEventHandler = (e) => {
    e.stopPropagation();

    changeUser();
    closeMenu();
  };

  const changeUser = () => {
    if (user === DEFAULT_USER_NAME) {
      setUser(PAIR_USER_NAME);
    } else {
      setUser(DEFAULT_USER_NAME);
    }

    updatePoint();
    updateCart();
    updateOrders();
  };

  useEffect(() => {
    if (isActive || ref.current === null) {
      return;
    }

    ref.current
      .getAnimations()
      .forEach((animation) => (animation.onfinish = () => closeMenu()));
  }, [isActive]);

  return (
    <Container $isActive={isActive} ref={ref}>
      <Inner>
        <User>
          <dt>닉네임</dt>
          <UserInner>
            <dd>{user}</dd>
            <ChangeUserButton
              type="button"
              aria-label="사용자 전환하기"
              onClick={handleChangeUserButtonClick}
            >
              <UserChangeIcon />
            </ChangeUserButton>
          </UserInner>
        </User>
        <Point>
          <dt>보유 포인트</dt>
          <dd>
            <RewardIcon />
            <span>{formatPrice(point)}</span>
          </dd>
        </Point>
      </Inner>
    </Container>
  );
};

const fadeInDown = keyframes`
  from {
    opacity: 0;
    transform: translate3D(0, -20%, 0);
  }

  to {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }
`;

const fadeOutUp = keyframes`
  from {
    opacity: 1;
    transform: translate3D(0, 0, 0);
  }

  to {
    opacity: 0;
    transform: translate3d(0, -20%, 0);
  }
`;

const Container = styled.div<{ $isActive: boolean }>`
  position: absolute;
  left: -130px;
  min-width: 300px;
  border: 1px solid ${(props) => props.theme.color.GRAY_350};
  border-radius: 8px;
  background-color: ${(props) => props.theme.color.WHITE};
  z-index: ${(props) => props.theme.zIndex.MENU};

  ${({ $isActive }) =>
    $isActive
      ? css`
          animation: 0.3s ease-in ${fadeInDown};
        `
      : css`
          animation: 0.3s ease-in ${fadeOutUp};
        `}
`;

const Inner = styled.dl`
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  padding: 30px 30px;
`;

const User = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 18px;
  font-weight: 600;
`;

const UserInner = styled.div`
  display: flex;
  align-items: center;
  column-gap: 10px;
`;

const ChangeUserButton = styled.button`
  margin-left: auto;
  font-size: 16px;
`;

const Point = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  & > dt {
    font-weight: 600;
  }

  & > dd {
    display: flex;
    align-items: center;
    column-gap: 5px;
    color: ${(props) => props.theme.color.PRIMARY};
  }
`;

export default UserMenu;
