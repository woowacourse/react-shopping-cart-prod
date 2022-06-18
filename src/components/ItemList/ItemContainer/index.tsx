import theme from 'styles/theme';
import { memo } from 'react';
import { useDispatch } from 'react-redux';
import { updateSnackBar } from 'redux/actions/snackBar';
import { Item } from 'types/domain';
import useUpdateCartItem from 'hooks/useUpdateCartItem';
import { useAppSelector } from 'hooks/useAppSelector';
import { formatDecimal, isEmptyObject } from 'utils';
import CroppedImage from 'components/@common/CroppedImage';
import { MESSAGE } from 'constant/message';
import { Styled } from './styles';
import LinkWrapper from 'components/@common/LinkWrapper';

const ItemContainer = ({ item }: { item: Item }) => {
  const { id, imageUrl, name, price } = item;
  const dispatch = useDispatch();
  const { data: cartList } = useAppSelector(state => state.cartListReducer);
  const { data: userData } = useAppSelector(state => state.userReducer);
  const { increaseQuantity } = useUpdateCartItem(cartList);

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
      <LinkWrapper to={`/item_detail/${id}`}>
        <CroppedImage src={imageUrl} width='270px' height='270px' alt='상품 이미지' />
      </LinkWrapper>
      <Styled.Footer>
        <LinkWrapper to={`/item_detail/${id}`}>
          <Styled.Title>{name}</Styled.Title>
          <Styled.Price>{formatDecimal(price)}원</Styled.Price>
        </LinkWrapper>
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
