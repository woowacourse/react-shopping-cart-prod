// @ts-nocheck
import ReactDOM from 'react-dom';
import Styled from './index.style';

const Spinner = () => {
  return (
    <>
      {ReactDOM.createPortal(
        <Styled.Container>
          <Styled.BounceFirst />
          <Styled.BounceSecond />
          <Styled.BounceThird />
        </Styled.Container>,
        document.getElementById('spinner-root'),
      )}
    </>
  );
};

export default Spinner;
