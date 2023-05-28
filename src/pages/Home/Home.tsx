import ProductList from "../../components/ProductList";
import { ErrorBoundary } from "react-error-boundary";
import Modal from "../../components/Modal";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalContentState, modalOpenState } from "../../recoil/modalAtoms.tsx";
import { serverState } from "../../recoil/serverAtom.ts";

function Home() {

  const server = useRecoilValue(serverState);

  return (
    <ErrorBoundary
      key={server}
      fallback={<div>상품 목록을 불러오는 도중 문제가 발생했습니다.</div>}
    >
      <ProductList />
    </ErrorBoundary>
  );
}

export default Home;
