import styled from 'styled-components';
import CroppedImage from 'components/common/CroppedImage';
import { ReactComponent as MonsterBallIcon } from 'assets/monsterBallIcon.svg';
import theme from 'styles/theme';
import { memo, MouseEvent } from 'react';
import { flexCenter } from 'styles/mixin';
import { Link } from 'react-router-dom';
import { formatDecimal } from 'utils';

interface ItemContainerProps {
  id: number;
  thumbnailUrl: string;
  title: string;
  price: number;
  updateCartItemQuantity?: (id: number) => void;
  openSnackbar?: (type: string) => void;
}

const ItemContainer = ({
  id,
  thumbnailUrl,
  title,
  price,
  updateCartItemQuantity,
  openSnackbar,
}: ItemContainerProps) => {
  const handleClickItemContainer = (e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>) => {
    if (e.target instanceof SVGElement) {
      e.preventDefault();
    }
  };

  const handleClickCartIcon = () => {
    updateCartItemQuantity?.(id);
    openSnackbar('cart');
  };

  return (
    <Link to={`/item_detail/${id}`} onClick={handleClickItemContainer} replace>
      <StyledRoot>
        <StyledTop>
          <Decorator1>
            <Decorator2 />
          </Decorator1>
          ■ ■ ■
        </StyledTop>
        <CroppedImageWrapper>
          <CroppedImage src={thumbnailUrl} width='200px' height='200px' alt='상품' />
        </CroppedImageWrapper>
        <StyledBottom>
          <StyledDescription>
            <StyledTitle>{title}</StyledTitle>
            <StyledPrice>{formatDecimal(price)}원</StyledPrice>
          </StyledDescription>
          <StyledMonsterBallIcon onClick={handleClickCartIcon} />
        </StyledBottom>
      </StyledRoot>
    </Link>
  );
};

export default memo(ItemContainer);

const StyledRoot = styled.div`
  ${flexCenter}
  flex-direction: column;
  width: 28.2rem;
  height: 35.8rem;
  gap: 1.8rem;
  cursor: pointer;

  box-shadow: rgba(0, 0, 0, 0.568) 10px 10px 2px 1px;
  background-color: ${theme.colors.red};
  border-radius: 10px;

  transition: box-shadow 0.1s ease;
  &:hover {
    img {
      transform: scale(1.1);
    }
  }
  img {
    transition: transform 0.5s ease;
  }
`;

const StyledTop = styled.div`
  display: flex;
  justify-content: space-between;
  padding-right: 20px;
  width: 100%;
  font-size: 12px;
`;

const Decorator1 = styled.div`
  ${flexCenter}
  margin-top: 10px;
  margin-left: 20px;
  background-color: ${theme.colors.white};
  border-radius: 50%;
  width: 25px;
  height: 25px;
`;

const Decorator2 = styled.div`
  background-color: ${theme.colors.whiteBlue};
  border-radius: 50%;
  width: 15px;
  height: 15px;
`;

const CroppedImageWrapper = styled.div`
  width: 240px;
  height: 240px;
  ${flexCenter};
  background-color: ${theme.colors.lightgrey};
  border-radius: 20px;

  position: relative;
  border-top-right-radius: 20px;
  border-bottom-left-radius: 20px;
  transition: all 1s;

  &:after,
  &:before {
    content: ' ';
    width: 20px;
    height: 20px;
    position: absolute;
    border: 0px solid ${theme.colors.white};
    transition: all 1s;
  }
  &:after {
    top: -1px;
    left: -1px;
    border-top: 5px solid black;
    border-left: 5px solid black;
  }
  &:before {
    bottom: -1px;
    right: -1px;
    border-bottom: 5px solid black;
    border-right: 5px solid black;
  }
  &:hover {
    border-top-right-radius: 20px;
    border-bottom-left-radius: 20px;

    background: ${theme.colors.realWhite};

    &:before,
    &:after {
      width: 100%;
      height: 100%;
      border-radius: 20px;
    }
  }
`;

const StyledBottom = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0 2rem;
  align-items: center;

  width: 96%;
  margin-bottom: 10px;
`;

const StyledDescription = styled.div`
  text-align: center;
  width: 85%;

  margin-right: 15px;
  border-radius: 7px;
  background-color: ${theme.colors.darkgrey2};
  color: ${theme.colors.realWhite};
`;

const StyledTitle = styled.p`
  font-size: 1.6rem;
`;

const StyledPrice = styled.p`
  font-size: 2rem;
`;

const StyledMonsterBallIcon = styled(MonsterBallIcon)`
  width: 22%;
  height: 100%;

  cursor: pointer;
`;
