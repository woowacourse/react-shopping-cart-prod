import { styled } from "styled-components";

interface ErrorType {
  status: string;
  message: string;
}

const ErrorBox = ({ status, message }: ErrorType) => {
  return (
    <Wrapper>
      <h2>{status}</h2>
      <p>{message}</p>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 100%;
  height: 100%;
  padding: 400px 0;

  align-items: center;
  text-align: center;
  line-height: 24px;

  & > h2 {
    font-size: 50px;
    font-weight: 700;
    margin-bottom: 30px;
  }
`;

export default ErrorBox;
