import useProductListPage from './hooks';
import errorApiImg from 'assets/png/errorApiImg.png';
import emptyImg from 'assets/png/emptyImg.png';
import ProductContainer from 'components/Product/ProductContainer/ProductContainer';
import ProductItem from 'components/Product/ProductItem/ProductItem';
import Skeleton from 'components/Common/Skeleton/Skeleton';
import ImgWrapper from 'components/Common/ImgWrapper/ImgWrapper';
import itemAltImg from 'assets/png/itemAltImg.png';
import { INITIAL_SKELETON_NUMBER } from 'constants';

const ProductList = () => {
  const {
    isLoading,
    isError,
    products,
    includedInCart,
    isEmpty,
    handleClickCartButton,
  } = useProductListPage();

  if (isError) return <ImgWrapper src={errorApiImg} />;
  if (isEmpty) return <ImgWrapper src={emptyImg} size="400" />;
  if (isLoading)
    return (
      <ProductContainer>
        {Array.from({ length: INITIAL_SKELETON_NUMBER }).map((_, index) => (
          <Skeleton key={index} size="small" />
        ))}
      </ProductContainer>
    );

  return (
    <ProductContainer>
      {products &&
        products.map(({ name, price, imageUrl, id }) => (
          <ProductItem
            id={id}
            name={name}
            price={price}
            imageUrl={imageUrl || itemAltImg}
            key={id}
            isInCart={includedInCart(id)}
            onClickCartButton={handleClickCartButton(id)}
          />
        ))}
    </ProductContainer>
  );
};

export default ProductList;
