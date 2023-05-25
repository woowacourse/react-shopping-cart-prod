import { styled } from "styled-components";
import { LoadingSpinner } from "../assets";

export const Loading = () => {
  return (
    <Wrapper>
      <img src={LoadingSpinner} alt="로딩" />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-top: 240px;

  & > img {
    width: 100px;
    height: 100px;
  }
`;
