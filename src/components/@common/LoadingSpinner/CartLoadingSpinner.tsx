import styled, { keyframes } from 'styled-components';

const dualRingAnimation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const DualRingContainer = styled.div`
  display: inline-block;
  width: 60px;
  height: 60px;
`;

const DualRingAfter = styled.div`
  content: '';
  display: block;
  width: 50px;
  height: 50px;
  margin: 8px;
  border-radius: 50%;
  border: 6px solid var(--mint-color);
  border-color: var(--mint-color) transparent var(--mint-color) transparent;
  animation: ${dualRingAnimation} 1.2s linear infinite;
`;

const DualRing = () => {
  return (
    <DualRingContainer className="lds-dual-ring">
      <DualRingAfter />
    </DualRingContainer>
  );
};

export default DualRing;
