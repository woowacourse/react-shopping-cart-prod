import * as Styled from './style';
import { useNavigate } from 'react-router-dom';
import { PATH_NAME } from 'constants';
import PropTypes from 'prop-types';
import smallCart from 'assets/svg/smallCart.svg';
import { parsePrice } from 'utils';

const ProductItem = ({
  id,
  name,
  price,
  imgUrl,
  onClickCartButton,
  isInCart,
}) => {
  const navigate = useNavigate();

  const handleClickItem = () => {
    navigate(`${PATH_NAME.PRODUCT}/${id}`);
  };

  return (
    <Styled.Wrapper onClick={handleClickItem}>
      <Styled.Overlay>
        <Styled.ThumbnailText>{name}</Styled.ThumbnailText>
      </Styled.Overlay>
      <Styled.Image src={imgUrl} alt={name} loading="lazy" />
      <Styled.Detail>
        <Styled.TopBox>
          <Styled.Name>{name}</Styled.Name>
          <Styled.Price>{parsePrice(price)}원</Styled.Price>
        </Styled.TopBox>
        <Styled.Button onClick={onClickCartButton} checked={isInCart}>
          <Styled.CartSvg src={smallCart} />
        </Styled.Button>
      </Styled.Detail>
    </Styled.Wrapper>
  );
};

ProductItem.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  price: PropTypes.number,
  imgUrl: PropTypes.string,
  onClickCartButton: PropTypes.func,
  isInCart: PropTypes.bool,
};

export default ProductItem;
