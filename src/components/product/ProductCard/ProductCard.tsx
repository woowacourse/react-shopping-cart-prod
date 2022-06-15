import Image from '../../common/Image/Image';
import * as Styled from './ProductCard.style';
import * as GlobalStyled from '../../../styles/GlobalStyles';
import Icon from '../../common/Icon/Icon';
import { useNavigate } from 'react-router-dom';
import Placeholder from '../../common/Placeholder/Placeholder';
import { ProductType } from '@/domain/product';
import { useExcludeCart } from '@/hooks/useExcludeCart';
interface ProductCardType {
  product: ProductType;
  onClickCartButton: (id: number) => void;
}

function ProductCard({ product, onClickCartButton }: ProductCardType) {
  const { id, imageURL, name, price } = product;
  const navigate = useNavigate();

  const { isShowCartButton } = useExcludeCart(id);

  const onClickCard = () => {
    navigate(`/products/${id}`);
  };

  return (
    <GlobalStyled.Position>
      <Styled.Container onClick={onClickCard}>
        <Image src={imageURL} alt={name} />
        <Styled.Content>
          <Styled.Description>
            <Styled.Name>{name}</Styled.Name>
            <Styled.Price>{price}원</Styled.Price>
          </Styled.Description>
        </Styled.Content>
      </Styled.Container>

      {isShowCartButton && (
        <GlobalStyled.Position position="absolute" bottom="5px" right="5px">
          <Styled.TransparentButton type="button" onClick={() => onClickCartButton(id)}>
            <Icon iconName="cart" color="#333" />
          </Styled.TransparentButton>
        </GlobalStyled.Position>
      )}
    </GlobalStyled.Position>
  );
}

ProductCard.skeleton = () => {
  return (
    <Styled.Container>
      <Placeholder aspectRatio="1/1" />
      <Styled.Content>
        <Placeholder height="30px" />
      </Styled.Content>
    </Styled.Container>
  );
};

export default ProductCard;
