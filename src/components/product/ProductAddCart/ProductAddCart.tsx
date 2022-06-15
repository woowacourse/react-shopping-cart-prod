import * as Styled from './ProductAddCart.style';
import * as GlobalStyled from '../../../styles/GlobalStyles';
import Counter from '../../common/Counter/Counter';
import { useCount } from '../../../hooks/useCount';
import { ProductType } from '@/domain/product';
interface ProductAddCartPropsType {
  product: ProductType;
  onClickAddCartButton: (id?: number, count?: number) => void;
}

function ProductAddCart({ product, onClickAddCartButton }: ProductAddCartPropsType) {
  const { id, name, price, stock } = product;

  const { count, increaseCount, decreaseCount } = useCount({
    initialValue: 1,
    min: 1,
    max: stock,
  });

  return (
    <Styled.Container>
      <GlobalStyled.Position>
        <Styled.ProductInfoWrapper>
          <Styled.Name>{name}</Styled.Name>
          <Styled.Price>{price} 원</Styled.Price>
          <GlobalStyled.Position position="absolute" right="0" bottom="0">
            <Counter count={count} increaseCount={increaseCount} decreaseCount={decreaseCount} />
          </GlobalStyled.Position>
        </Styled.ProductInfoWrapper>
      </GlobalStyled.Position>

      <Styled.TotalPriceWrapper>
        <Styled.Title>합계</Styled.Title>
        <Styled.TotalPrice>{price * count} 원</Styled.TotalPrice>
      </Styled.TotalPriceWrapper>

      <Styled.Button onClick={() => onClickAddCartButton(id, count)}>장바구니에 담기</Styled.Button>
    </Styled.Container>
  );
}

export default ProductAddCart;
