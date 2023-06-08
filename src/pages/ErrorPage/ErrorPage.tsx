import * as Styled from './ErrorPage.styles.tsx';
import { useLocation, useNavigate } from 'react-router-dom';
import BrokenDiamond from '../../assets/broken-diamond.png';

const ErrorPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  if (!state) {
    navigate('/');
  }

  const renderError = () => {
    switch (state?.statusCode) {
      case 404:
        return <p>404 Page Not Found.</p>;
      case 500:
        return <p>500 Internal Server Error.</p>;
      default:
        return <p>Something went wrong.</p>;
    }
  };

  const homeButtonHandler = () => {
    navigate('/');
  };

  return (
    <Styled.ErrorPageWrapper>
      <Styled.ErrorPageContent>
        <img src={BrokenDiamond} alt='error image' />
        {renderError()}
        <button onClick={homeButtonHandler}>홈으로</button>
      </Styled.ErrorPageContent>
    </Styled.ErrorPageWrapper>
  );
};

export default ErrorPage;
