import * as S from './Loading.styled';

function Loading() {
  return (
    <S.LoadingContainer>
      <img
        src="https://3.bp.blogspot.com/-uHU-f8xSLOw/WDZwzCUuBMI/AAAAAAAELW0/VfUc6uwqovsudmSZNGg2dCENctJchI9OACLcB/s1600/AS000620_13.gif?time=Wed%20Jun%2001%202022%2014:49:55%20GMT+0900%20(%ED%95%9C%EA%B5%AD%20%ED%91%9C%EC%A4%80%EC%8B%9C)"
        alt="로딩이미지"
      />
      <p>로딩중...</p>
    </S.LoadingContainer>
  );
}

export default Loading;
