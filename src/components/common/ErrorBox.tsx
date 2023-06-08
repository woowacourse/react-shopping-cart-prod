import { styled } from "styled-components";
import { ERROR_MESSAGE } from "../../constants/index";
import { Button } from "./Button";

interface ErrorType {
  status: keyof typeof ERROR_MESSAGE;
}

export const ErrorBox = ({ status }: ErrorType) => {
  return (
    <Wrapper>
      <h2>{status}</h2>
      <p>{ERROR_MESSAGE[status]}</p>
      <p>
        예기치 못한 에러가 발생했습니다. <br />
        잠시후 서비스를 이용해주세요.
      </p>
      <Button onClick={() => window.location.replace("/")}>새로고침하기</Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-self: center;
  width: 100vw;
  height: 100%;
  padding: 20% 0;

  align-items: center;
  text-align: center;
  line-height: 24px;

  & > h2 {
    font-size: 50px;
    font-weight: 700;
    margin-bottom: 30px;
  }
`;
