import styled from 'styled-components';

import AmountCounter from '../Common/AmountCounter';

import CartIcon from '../../assets/CartIcon';
import useCartProducts from '../../hooks/useCartProducts';
import useProductQuantity from '../../hooks/useProductQuantity';

interface ProductCartButtonProps {
  productId: number;
}

const ProductCartButton = ({ productId }: ProductCartButtonProps) => {
  const { targetProduct, addProduct } = useCartProducts(productId);
  const { addCount, subtractCount } = useProductQuantity(
    targetProduct?.id,
    targetProduct?.quantity
  );

  if (targetProduct) {
    return (
      <AmountCounter
        count={targetProduct.quantity}
        addCount={addCount}
        subtractCount={subtractCount}
        variant='small'
      />
    );
  }

  return (
    <ProductAddButton type='button' onClick={addProduct}>
      <CartIcon width={25} height={22} color='gray400' />
    </ProductAddButton>
  );
};

const ProductAddButton = styled.button`
  position: absolute;
  top: 0;
  right: 14px;
`;

export default ProductCartButton;
