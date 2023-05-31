import { styled } from "styled-components";

const ErrorInfo = ({ error }: { error: Error }) => {
  const [statusCode, errorMessage] = error.message.split("/");

  return (
    <Wrapper>
      <ErrorIcon
        src="https://cdn-icons-png.flaticon.com/128/9533/9533355.png"
        alt="에러 아이콘"
      />
      <Title>{statusCode}</Title>
      <DescribeText>{errorMessage}</DescribeText>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  height: 40vh;
  width: 60%;

  margin: auto;

  display: flex;
  flex-direction: column;
  justify-content: center;
  row-gap: 20px;
`;

const Title = styled.p`
  font-size: 30px;
  font-weight: 500;
`;

const DescribeText = styled.p`
  font-size: 15px;
`;

const ErrorIcon = styled.img`
  align-self: center;

  width: 80px;
  height: 80px;
`;

export default ErrorInfo;

// <div style={{ width: "100vw", height: "100hw", display: "flex" }}>
// 에러 바운더리로 대체된 컴포넌트입니다.
// </div>
