import styled from 'styled-components';

function Loading() {
  return (
    <LoadingContainer>
      <img src="https://3.bp.blogspot.com/-uHU-f8xSLOw/WDZwzCUuBMI/AAAAAAAELW0/VfUc6uwqovsudmSZNGg2dCENctJchI9OACLcB/s1600/AS000620_13.gif?time=Wed%20Jun%2001%202022%2014:49:55%20GMT+0900%20(%ED%95%9C%EA%B5%AD%20%ED%91%9C%EC%A4%80%EC%8B%9C)" />
      <p>빙글빙글 돌아가는 짱구의 하루</p>
    </LoadingContainer>
  );
}

const LoadingContainer = styled.div`
  position: absolute;
  top: 20%;
  display: flex;
  flex-direction: column;
  align-items: center;

  p {
    font-size: 20px;
    font-weight: 600;
  }
`;

export default Loading;
