import styled from 'styled-components';
import CroppedImage from 'components/common/CroppedImage';
import { ReactComponent as CartIcon } from 'assets/cartIcon.svg';
import theme from 'styles/theme';
import { memo, MouseEvent } from 'react';
import { flexCenter } from 'styles/mixin';
import { Link } from 'react-router-dom';
import { formatDecimal } from 'utils';
import { useDispatch } from 'react-redux';
import { updateSnackBar } from 'redux/actions/snackBar';
import { Item } from 'types/domain';

interface ItemContainerProps {
  item: Item;
  increaseQuantity: (id: number) => void;
}

const ItemContainer = ({ item, increaseQuantity }: ItemContainerProps) => {
  const { id, imageUrl, name, price } = item;
  const dispatch = useDispatch();

  const handleClickItemContainer = (e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>) => {
    if (e.target instanceof SVGElement) {
      e.preventDefault();
    }
  };

  const handleClickCartIcon = () => {
    increaseQuantity(id);
    dispatch(updateSnackBar(`${name} 1개를 장바구니에 추가했습니다.`));
  };

  return (
    <Link to={`/item_detail/${id}`} onClick={handleClickItemContainer} replace>
      <StyledRoot>
        <CroppedImage src={imageUrl} width='270px' height='270px' alt='상품' />
        <StyledBottom>
          <StyledDescription>
            <StyledTitle>{name}</StyledTitle>
            <StyledPrice>{formatDecimal(price)}원</StyledPrice>
          </StyledDescription>
          <StyledCartIcon
            width='31px'
            fill={theme.colors.lightBlack}
            onClick={handleClickCartIcon}
          />
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
  transition: box-shadow 0.1s ease;
  &:hover {
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
    img {
      transform: scale(1.2);
    }
  }
  img {
    transition: transform 0.5s ease;
  }
`;

const StyledBottom = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  padding: 0 2rem;
  align-items: center;
`;

const StyledDescription = styled.div``;

const StyledTitle = styled.p`
  font-size: 1.6rem;
`;

const StyledPrice = styled.p`
  font-size: 2rem;
`;

const StyledCartIcon = styled(CartIcon)`
  cursor: pointer;
`;
