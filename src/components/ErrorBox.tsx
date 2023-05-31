import { styled } from "styled-components";
import { ERROR_MESSAGE } from "../constants/index";

interface ErrorType {
  status: keyof typeof ERROR_MESSAGE;
}

export const ErrorBox = ({ status }: ErrorType) => {
  return (
    <Wrapper>
      <h2>{status}</h2>
      <p>{ERROR_MESSAGE[status]}</p>
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
