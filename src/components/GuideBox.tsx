import { styled } from "styled-components";
import { useRouter } from "../hooks/useRouter";
import { Button } from "../components";
import { ROUTER_PATH } from "../router";

interface GuideType {
  icon: string;
  message: string;
  guideMessage: string;
}

export const GuideBox = ({ icon, message, guideMessage }: GuideType) => {
  const { goPage } = useRouter();

  return (
    <Wrapper>
      <span>{icon}</span>
      <p>{message}</p>
      <Button onClick={goPage(ROUTER_PATH.Main)}>{guideMessage}</Button>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 400px;
  align-items: center;
  align-self: center;

  text-align: center;
  padding: 10% 0;

  & > span {
    font-size: 60px;
    margin-bottom: 25px;
  }
  & > p {
    font-size: 18px;
    font-weight: 600;
    margin-bottom: 25px;
  }
`;

export default GuideBox;
