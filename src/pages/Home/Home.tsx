import { ErrorBoundary } from 'react-error-boundary';
import { useRecoilValue } from 'recoil';
import { serverState } from '../../recoil/serverAtom.ts';
import ProductList from '../../components/Product/ProductList/ProductList.tsx';

function Home() {
  const server = useRecoilValue(serverState);

  return (
    <ErrorBoundary key={server} fallback={<div>상품 목록을 불러오는 도중 문제가 발생했습니다.</div>}>
      <ProductList />
    </ErrorBoundary>
  );
}

export default Home;
