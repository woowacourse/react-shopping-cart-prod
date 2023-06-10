import Skeleton from "components/common/Skeleton";
import { useNavigate } from "react-router-dom";
import { ROUTER_PATH } from "router";
import { styled } from "styled-components";

interface FallbackProps {
  error: Error;
  resetErrorBoundary: () => void;
}

const Fallback = ({ error, resetErrorBoundary }: FallbackProps) => {
  const navigate = useNavigate();

  const goToMain = () => {
    navigate(ROUTER_PATH.Main);
  };

  return (
    <>
      <Skeleton {...{ background: "#333333", width: "100%", height: "70px" }} />
      <ErrorBox>
        <h2>Sorry</h2>
        <p>{error.message}</p>
        <HomeButton onClick={goToMain}>홈으로</HomeButton>
      </ErrorBox>
    </>
  );
};

const ErrorBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
  padding: 200px 0;

  align-items: center;
  text-align: center;
  line-height: 24px;

  & > h2 {
    font-size: 50px;
    font-weight: 700;
    margin-bottom: 30px;
  }
`;

const HomeButton = styled.button`
  margin-top: 20px;
  border-radius: 5px;
  width: 20%;
  height: 40px;
  background: #333333;
  color: white;
  cursor: pointer;

  &:hover {
    box-shadow: 0 10px 10px -3px rgba(0, 0, 0, 0.25);
    transition: all 0.3s ease;
  }
`;

export default Fallback;
