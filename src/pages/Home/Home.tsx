import ProductList from "../../components/ProductList";
import { ErrorBoundary } from "react-error-boundary";
import { useRecoilValue } from "recoil";
import { serverState } from "../../recoil/serverAtom.ts";
import BigAlert from "../../components/BigAlert";

function Home() {

  const server = useRecoilValue(serverState);

  return (
    <ErrorBoundary
      key={server}
      fallback={
        <BigAlert
          title="앗"
          message="상품 목록을 불러오는 도중 문제가 발생했습니다."
          goHome
        />
      }
    >
      <ProductList />
    </ErrorBoundary>
  );
}

export default Home;
