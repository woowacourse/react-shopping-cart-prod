import { styled } from 'styled-components';
import DeleteIcon from '../assets/icons/delete.svg';
import useCartActions from '../hooks/useCartActions';
import type { Product } from '../type';
import { Image, ItemContainer, Name, Price } from './common/ProductItem';
import Stepper from './common/Stepper';

const CartItemSection = styled.section`
  width: 100%;
`;

const CartItemListItemContainer = styled.div`
  display: flex;

  width: 100%;
`;

const DeleteButton = styled.button`
  display: flex;
  justify-content: flex-end;

  width: 100%;
`;

type CartItemListItemProps = {
  quantity: number;
  product: Product;
};

const ColumnFlexBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-end;

  margin-left: 20px;
`;

const RowFlexBox = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-end;

  width: 100%;
`;

const CartItemListItem = (props: CartItemListItemProps) => {
  const { quantity, product } = props;
  const { setQuantity } = useCartActions();

  const handleChangeQuantityWithinSafeRange = (newQuantity: number) => {
    setQuantity(product, Math.max(1, newQuantity));
  };

  return (
    <CartItemSection>
      <CartItemListItemContainer>
        <ItemContainer
          key={product.id}
          productData={{
            name: product.name,
            image: product.imageUrl,
            price: product.price,
            quantity,
          }}
          containerStyle={{ display: 'flex', padding: '20px 20px 20px 0', width: '100%' }}
        >
          <Image />
          <RowFlexBox>
            <ColumnFlexBox>
              <Name />
              <Stepper
                variant="large"
                value={quantity}
                onChange={handleChangeQuantityWithinSafeRange}
              />
            </ColumnFlexBox>
            <ColumnFlexBox>
              <DeleteButton onClick={() => setQuantity(product, 0)}>
                <img src={DeleteIcon} alt="삭제" />
              </DeleteButton>
              <Price style={{ fontSize: '16px' }} />
            </ColumnFlexBox>
          </RowFlexBox>
        </ItemContainer>
      </CartItemListItemContainer>
    </CartItemSection>
  );
};

export default CartItemListItem;
