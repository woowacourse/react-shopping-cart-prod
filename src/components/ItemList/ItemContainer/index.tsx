import theme from 'styles/theme';
import { Link } from 'react-router-dom';
import { memo, MouseEvent } from 'react';
import { useDispatch } from 'react-redux';
import { updateSnackBar } from 'redux/actions/snackBar';
import { Item } from 'types/domain';
import useUpdateCartItem from 'hooks/useUpdateCartItem';
import { useAppSelector } from 'hooks/useAppSelector';
import { formatDecimal, isEmptyObject } from 'utils';
import CroppedImage from 'components/@common/CroppedImage';
import { MESSAGE } from 'constant/message';
import { Styled } from './styles';

const ItemContainer = ({ item }: { item: Item }) => {
  const { id, imageUrl, name, price } = item;
  const dispatch = useDispatch();
  const { data: cartList } = useAppSelector(state => state.cartListReducer);
  const { data: userData } = useAppSelector(state => state.userReducer);
  const { increaseQuantity } = useUpdateCartItem(cartList);

  const handleClickItemContainer = (e: MouseEvent<HTMLAnchorElement, globalThis.MouseEvent>) => {
    if (e.target instanceof SVGElement) {
      e.preventDefault();
    }
  };

  const handleClickCartIcon = () => {
    if (isEmptyObject(userData)) {
      dispatch(updateSnackBar(MESSAGE.NOT_USER));

      return;
    }

    increaseQuantity(id);
    dispatch(updateSnackBar(`${name} ${MESSAGE.ADD_CART}`));
  };

  return (
    <Styled.ItemContainer>
      <Link to={`/item_detail/${id}`} onClick={handleClickItemContainer} replace>
        <CroppedImage src={imageUrl} width='270px' height='270px' alt='상품 이미지' />
      </Link>
      <Styled.Footer>
        <Link to={`/item_detail/${id}`} onClick={handleClickItemContainer} replace>
          <Styled.Title>{name}</Styled.Title>
          <Styled.Price>{formatDecimal(price)}원</Styled.Price>
        </Link>
        <Styled.CartIcon
          width='31px'
          fill={theme.colors.lightBlack}
          onClick={handleClickCartIcon}
        />
      </Styled.Footer>
    </Styled.ItemContainer>
  );
};

export default memo(ItemContainer);
