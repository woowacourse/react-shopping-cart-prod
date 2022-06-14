import * as S from './NotFoundPage.styled';

function NotFoundPage() {
  return (
    <S.Page>
      <S.ErrorCode>404</S.ErrorCode>
      <br />
      NOT_FOUND_ERROR
      <img
        src="https://user-images.githubusercontent.com/57928612/169459010-97a04d43-48b9-4f96-83da-3229af21609a.png"
        alt="시무룩짱구"
        width="300px"
      />
    </S.Page>
  );
}

export default NotFoundPage;
