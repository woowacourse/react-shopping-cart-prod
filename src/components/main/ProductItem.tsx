import { styled } from 'styled-components';
import QuantityInput from '../QuantityInput';
import { useRecoilValue } from 'recoil';
import { isSelectedProductSelector } from '../../store/CartSelector';
import CartIconButton from './CartIconButton';
import { useProduct } from '../../hooks/useProduct';
import { LoadingSpinner } from '../@common/LoadingSpinner';

interface Props {
  id: number;
  name: string;
  price: number;
  imgUrl: string;
}

const ProductItem = ({ id, imgUrl, name, price }: Props) => {
  const isSelected = useRecoilValue(isSelectedProductSelector(id));
  const {
    newQuantity,
    handleBlurItem,
    addItemToCart,
    handleDecreaseItem,
    handleIncreaseItem,
    handleNumberInputChange,
    isLoading,
  } = useProduct(id);

  const handleCartClick = () => {
    addItemToCart();
  };

  return (
    <S.Wrapper>
      <S.ImageWrapper>
        <S.Image src={imgUrl} alt={`img${id}`} />
      </S.ImageWrapper>
      <S.ButtonWrapper>
        {isSelected ? (
          isLoading ? (
            <LoadingSpinner />
          ) : (
            <QuantityInput
              value={newQuantity}
              onChange={handleNumberInputChange}
              onIncrement={handleIncreaseItem}
              onDecrement={handleDecreaseItem}
              onBlur={handleBlurItem}
              id={`product${id}`}
            />
          )
        ) : (
          <CartIconButton onClick={handleCartClick} ariaLabel={id} />
        )}
      </S.ButtonWrapper>
      <S.InfoWrapper>
        <div>
          <S.Name htmlFor={`product${id}`}>{name}</S.Name>
          <S.Price>
            {price.toLocaleString()}
            <span>원</span>
          </S.Price>
        </div>
      </S.InfoWrapper>
    </S.Wrapper>
  );
};

const S = {
  Wrapper: styled.div`
    position: relative;
  `,
  ImageWrapper: styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    width: 210px;
    height: 210px;
    overflow: hidden;
    border-radius: 10px;
    background-color: #e2e2e2;

    @media all and (min-width: 768px) and (max-width: 1023px) {
      width: 225px;
      height: 225px;
    }

    @media all and (min-width: 480px) and (max-width: 767px) {
      width: 235px;
      height: 235px;
    }

    @media all and (max-width: 479px) {
      width: 286px;
      height: 286px;
    }
  `,

  Image: styled.img`
    width: 100%;
    height: auto;
  `,

  ButtonWrapper: styled.div`
    position: absolute;
    bottom: 70px;
    right: 8px;
  `,

  InfoWrapper: styled.div`
    position: relative;
    display: flex;
    justify-content: space-between;
    padding: 12px 6px 0;
  `,

  Name: styled.label`
    display: -webkit-box;
    font-size: 16px;
    font-weight: 400;
    line-height: 1.4;
    letter-spacing: 0.5px;
    margin-right: 4px;
    color: var(--text-color);
    opacity: 0.9;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-box-orient: vertical;
    -webkit-line-clamp: 1;
  `,

  Price: styled.p`
    margin-top: 8px;
    font-size: 17px;
    font-weight: 500;
    letter-spacing: 0.5px;
    color: var(--text-color);

    & span {
      font-size: 17px;
      vertical-align: top;
    }
  `,
};

export default ProductItem;
