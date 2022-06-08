import cartAPI from 'apis/cart';
import { Link, ShoppingCart } from 'components/@shared';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { cartActions } from 'redux/actions';
import { getAccessToken } from 'utils/auth';

import { CART_MESSAGE, USER_MESSAGE } from 'constants/message';
import PATH from 'constants/path';

import * as S from './ProductCard.styled';
import { Props } from './ProductCard.type';

function ProductCard({ product, cartQuantity }: Props) {
  const { id, name, price, description, imageUrl } = {
    ...product,
    price: Number(product.price),
  };
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onClickCartButton = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    const accessToken = getAccessToken();

    if (!accessToken) {
      alert(USER_MESSAGE.NEED_LOGIN);
      navigate(PATH.LOGIN, { replace: true });

      return;
    }

    cartAPI
      .add(accessToken, id, 1)
      .then(res => {
        alert(CART_MESSAGE.SUCCESS_ADD);
        dispatch(cartActions.setCart(res));
      })
      .catch(error => {
        alert(CART_MESSAGE.FAIL_ADD);
      });
  };

  return (
    <Link to={`${PATH.PRODUCT}/${id}`}>
      <S.Card>
        <S.CardImageContainer>
          <S.CardImageOverlay>
            <p>{description}</p>
            <div onClick={onClickCartButton}>구매하기</div>
          </S.CardImageOverlay>
          <img src={imageUrl} alt={name} />
        </S.CardImageContainer>
        <S.CardDescriptionContainer>
          <h3>{name}</h3>
          <p>{price.toLocaleString('ko-KR')} 원</p>
        </S.CardDescriptionContainer>
        <S.CardButtonContainer>
          <button onClick={onClickCartButton}>
            <ShoppingCart
              width="100%"
              fill={cartQuantity > 0 ? '#ff9c9c' : 'currentColor'}
            />
            {cartQuantity > 0 && <S.Badge>{cartQuantity}</S.Badge>}
          </button>
        </S.CardButtonContainer>
      </S.Card>
    </Link>
  );
}

export default ProductCard;
