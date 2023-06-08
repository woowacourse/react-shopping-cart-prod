import { useRecoilValue } from 'recoil';
import { css, styled } from 'styled-components';
import { QUANTITY } from '../../constants';
import { useSetCart } from '../../hooks/useCart';
import { quantitySelector } from '../../recoil';
import { Product } from '../../types';
import QuantityButton from '../cart/QuantityButton';
import CartIcon from '../icons/CartIcon';
import Price from '../Price';

const ProductItem = ({ id, imageUrl, name, price }: Product) => {
  const quantity = useRecoilValue(quantitySelector(id));
  const { addToCart } = useSetCart(id);

  return (
    <Item>
      <ThumbnailWrapper>
        <Thumbnail src={imageUrl} alt={name} />
      </ThumbnailWrapper>
      <StyledFieldset>
        <NamePriceWrapper>
          <Label htmlFor={name} title={name}>
            {name}
          </Label>
          <Price price={price} css={priceStyle} />
        </NamePriceWrapper>
        {quantity > QUANTITY.NONE ? (
          <QuantityButton productId={id} min={QUANTITY.NONE} max={QUANTITY.MAX} />
        ) : (
          <StyledButton type="button" onClick={addToCart}>
            <CartIcon css={svgStyle} />
          </StyledButton>
        )}
      </StyledFieldset>
    </Item>
  );
};

const Item = styled.li``;

const ThumbnailWrapper = styled.div`
  overflow: hidden;
`;

const Thumbnail = styled.img`
  width: 100%;

  &:hover {
    transform: scale(1.15);
  }
`;

const StyledFieldset = styled.fieldset`
  position: relative;
  display: flex;
  justify-content: space-between;
  padding: 12px 6px 0;
`;

const StyledButton = styled.button`
  align-self: start;
  background: none;
  cursor: pointer;
`;

const Label = styled.label`
  display: -webkit-box;
  margin-right: 4px;
  font-weight: 400;
  line-height: 1.4;
  letter-spacing: 0.5px;
  color: var(--text-color);
  opacity: 0.9;
  overflow: hidden;
  text-overflow: ellipsis;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 1;

  @media (max-width: 1270px) {
    font-size: 15px;
  }

  @media (max-width: 768px) {
    font-size: 14px;
  }
`;

const NamePriceWrapper = styled.div``;

const svgStyle = css`
  transform: scaleX(-1);
`;

const priceStyle = css`
  margin-top: 8px;
  font-weight: 500;
`;

export default ProductItem;
