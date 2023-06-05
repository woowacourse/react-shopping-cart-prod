import type { Product } from '../../types/product';

import styled from 'styled-components';

import CartIcon from '../../assets/CartIcon';
import Image from '../Common/Image';
import AmountCounter from '../Common/AmountCounter';

import useCart from '../../hooks/useCart';

interface ProductItemProps {
  product: Product;
}

const ProductItem = ({ product }: ProductItemProps) => {
  const { imageUrl, name, price, stock } = product;
  const { target, addProduct, addCount, subtractCount } = useCart(product);
  const isProductExistInCart = target && target.quantity > 0;
  const isSoldOut = stock === 0;
  const isSoldSoon = stock > 0 && stock <= 5;

  return (
    <ProductContainer>
      <Image src={imageUrl} alt={name} loading='lazy' size='medium' />
      <ProductInfoContainer>
        <dl>
          <ProductName>{name}</ProductName>
          <ProductPrice>{price.toLocaleString('ko-KR')} 원</ProductPrice>
        </dl>
        {isSoldOut ? (
          <SoldOutLabel>품절</SoldOutLabel>
        ) : (
          <>
            {isProductExistInCart ? (
              <AmountCounter
                designtype='main'
                count={target.quantity}
                addCount={addCount}
                subtractCount={subtractCount}
              />
            ) : (
              <ProductCartBtn
                type='button'
                data-testid='product-cart-btn'
                onClick={addProduct}
              >
                <CartIcon width={25} height={22} color='gray400' />
              </ProductCartBtn>
            )}
          </>
        )}
      </ProductInfoContainer>
      <SoldOutWarning>
        {isSoldSoon && (
          <>
            <p>품절 임박! {stock}개 남았어요</p>
          </>
        )}
      </SoldOutWarning>
    </ProductContainer>
  );
};

const ProductContainer = styled.div`
  width: 282px;
}
`;

const ProductInfoContainer = styled.div`
  position: relative;
  display: flex;
  justify-content: space-between;
  margin-top: 14px;
  padding: 0 14px 6px 14px;
`;

const ProductName = styled.dt`
  line-height: 22px;
`;

const ProductPrice = styled.dd`
  font-size: 20px;
  line-height: 26.67px;
`;

const SoldOutWarning = styled.p`
  margin-left: 14px;
  color: red;

  font-weight: 800;

  animation: blink 2s infinite;

  @keyframes blink {
    0% {
      opacity: 1;
    }
    50% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
`;

const SoldOutLabel = styled.div`
  width: 80px;
  height: 40px;
  text-align: center;
  color: red;
  transform: rotate(-20deg);

  font-size: 20px;
  font-weight: 600;
  padding-top: 5px;
  border: 2px solid red;
`;

const ProductCartBtn = styled.button`
  position: absolute;
  top: 0;
  right: 14px;
`;

export default ProductItem;
