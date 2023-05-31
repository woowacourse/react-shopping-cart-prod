import { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const OnLoading = () => {
  const [loadingText, setLoadingText] = useState('');

  useEffect(() => {
    const text = 'Tiiffany & Co.';
    let index = 0;

    const intervalId = setInterval(() => {
      setLoadingText((prevText) => {
        if (text[index] !== undefined) return prevText + text[index];
        return prevText;
      });
      index++;

      if (index === text.length) {
        clearInterval(intervalId);
      }
    }, 50);

    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <Wrapper>
      <LoadingContainer>
        {loadingText &&
          loadingText.split('').map((char, index) => (
            <LoadingText key={index} delay={index * 0.1}>
              {char}
            </LoadingText>
          ))}
      </LoadingContainer>
    </Wrapper>
  );
};

export default OnLoading;

const Wrapper = styled.div`
  width: 100vw;
  height: 100vh;

  display: flex;
  justify-content: center;
  align-items: center;
`;

const fadeIn = keyframes`
  from {
    opacity: 0;
    transform: translateY(20%);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

const LoadingText = styled.div<{ delay: number }>`
  font-size: 36px;
  letter-spacing: 4px;

  opacity: 0;
  animation: ${fadeIn} 1s ease-in-out forwards;
  animation-delay: ${(props) => props.delay}s;
`;

const LoadingContainer = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;

  width: 200px;
`;
