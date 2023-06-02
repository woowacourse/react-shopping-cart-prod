import { useRecoilValue } from 'recoil';
import { $CurrentServerUrl } from 'src/recoil/atom';
import { Product } from 'src/types';
import ProductItem from 'src/components/ProductItem';
import useFetch from 'src/hooks/useFetch';
import fetchData from 'src/api';
import styles from './index.module.scss';

function ProductItemList() {
  const currentServerUrl = useRecoilValue($CurrentServerUrl);
  const { result: productsData } = useFetch({
    fetch: fetchData<Product[]>,
    arg: { url: `${currentServerUrl}/products` },
    key: 'products',
    suspense: true,
  });

  return (
    <section className={styles.container}>
      {productsData?.map((item: Product) => (
        <ProductItem key={item.id} product={item} />
      ))}
    </section>
  );
}

export default ProductItemList;
