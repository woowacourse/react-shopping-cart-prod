import * as S from './styles/ErrorPage.styles';

export default function ErrorPage() {
  return (
    <S.Wrapper>
      <S.Image src="./404.svg" />
      <S.Title>페이지를 찾지 못했어요.</S.Title>
      <S.Message>주소에 오타가 있거나, </S.Message>
      <S.Message>변경, 삭제되었을 수도 있어요!</S.Message>
      <S.StyledLink to="/">홈으로 가기</S.StyledLink>
    </S.Wrapper>
  );
}
