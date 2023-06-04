import { useEffect, useRef } from 'react';
import { css, keyframes, styled } from 'styled-components';
import usePoint from '../../../hooks/usePoint';
import { RewardIcon } from '../../../assets/svg';
import { formatPrice } from '../../../utils/formatPrice';
import useMenu from './useMenu';

const UserMenu = ({ isActive }: { isActive: boolean }) => {
  const ref = useRef<HTMLDivElement>(null);
  const { point } = usePoint();
  const { closeMenu } = useMenu();

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
          <dd>유스</dd>
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
  border: 1px solid ${(props) => props.theme.color.gray350};
  border-radius: 8px;
  background-color: ${(props) => props.theme.color.white};
  z-index: ${(props) => props.theme.zIndex.menu};

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
  font-size: 18px;
  font-weight: 600;
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
    color: ${(props) => props.theme.color.primary};
  }
`;

export default UserMenu;
