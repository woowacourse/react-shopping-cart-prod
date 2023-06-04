import { styled } from "styled-components";

const ErrorInfo = ({ error }: { error: Error }) => {
  return (
    <Wrapper>
      <ErrorIcon
        src="https://cdn-icons-png.flaticon.com/128/9533/9533355.png"
        alt="에러 아이콘"
      />
      <DescribeText>{error.message}</DescribeText>
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
  row-gap: 30px;
`;

const DescribeText = styled.p`
  font-size: 25px;
  font-weight: 400;
`;

const ErrorIcon = styled.img`
  align-self: center;

  width: 80px;
  height: 80px;
`;

export default ErrorInfo;
