import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Transition } from 'react-transition-group';
import styled from 'styled-components';
import { css } from 'styled-components';

import { hideSnackBar } from 'redux/actions/snackbar.action';

const duration = 300;

const defaultStyle = {
  transition: `opacity ${duration}ms ease-in-out`,
  opacity: 0,
};

const transitionStyles = {
  entering: { opacity: 1 },
  entered: { opacity: 1 },
  exiting: { opacity: 0 },
  exited: { opacity: 0 },
};

function SnackBar() {
  const dispatch = useDispatch();
  const { show, message } = useSelector(state => state.snackBar);
  useEffect(() => {
    if (show) {
      setTimeout(() => {
        dispatch(hideSnackBar());
      }, 2700);
    }
  }, [show]);

  return (
    <Transition in={show} timeout={duration}>
      {state => (
        <SnackBarContainer
          show={show}
          style={{
            ...defaultStyle,
            ...transitionStyles[state],
          }}
          role="alert"
        >
          {message}
        </SnackBarContainer>
      )}
    </Transition>
  );
}

export default SnackBar;

const SnackBarContainer = styled.div`
  position: fixed;
  right: 3%;
  bottom: 3%;
  height: 3%;
  height: 50px;
  border-radius: 5px;
  padding: ${({ show }) => (show ? `1rem 3rem` : '0')};
  text-align: center;
  opacity: 0.1;
  ${({ theme }) => css`
    background-color: ${theme.colors['MINT_001']};
    color: ${theme.colors['WHITE_001']};
  `};
`;
