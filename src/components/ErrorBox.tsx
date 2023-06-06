import { styled } from 'styled-components';
import { ROUTER_PATH } from '../router';
import { generateStatusErrorMessage } from '../utils/generateStatusErrorMessage';

const ErrorBox = ({ errorMessage }: { errorMessage: string }) => {
  return (
    <Wrapper>
      <p>{generateStatusErrorMessage(errorMessage)}</p>
      <a href={ROUTER_PATH.Main}>홈으로</a>
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

export default ErrorBox;
