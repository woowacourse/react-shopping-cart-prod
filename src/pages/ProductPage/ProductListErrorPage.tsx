import {
  Container,
  ErrorContent,
  ErrorTitle,
} from './ProductListErrorPage.styles';

const ProductListErrorPage = () => {
  return (
    <Container>
      <ErrorTitle>⚠️ 상품목록을 불러오는데 실패하였습니다.</ErrorTitle>
      <ErrorContent>
        에러가 계속 발생한다면 아래 지침들이 도움이 될 수 있습니다.
        <ul>
          <li>- 페이지를 새로고침해보세요.</li>
          <li>- 네트워크에 접속되어있는지 확인해보세요.</li>
        </ul>
      </ErrorContent>
    </Container>
  );
};

export default ProductListErrorPage;
