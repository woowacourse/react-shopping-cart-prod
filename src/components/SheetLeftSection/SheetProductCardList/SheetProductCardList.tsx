import { useRecoilValue } from 'recoil';
import { cartCheckedProductsState } from 'state/cartCheckedProducts';
import { cartProductsState } from 'state/cartProducts';
import styled from 'styled-components';
import SheetProductCard from './SheetProductCard/SheetProductCard';
import { CartProduct } from 'types/product';

const SheetProductCardList = () => {
  const checkedProductIds = useRecoilValue(cartCheckedProductsState);
  const cartProducts = useRecoilValue(cartProductsState);
  const checkedProducts = [...checkedProductIds].map((id) => {
    return cartProducts.get(id);
  }) as CartProduct[];

  return (
    <SheetProductFlex>
      <Title>주문상품</Title>
      {checkedProducts.map((cartProduct) => {
        return <SheetProductCard key={cartProduct.product.id} sheetProduct={cartProduct} />;
      })}
    </SheetProductFlex>
  );
};

export default SheetProductCardList;

const SheetProductFlex = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const Title = styled.h4`
  width: 100%;
  font-size: 20px;
  overflow: hidden;
  margin: 20px auto 20px;
`;
