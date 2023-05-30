import styled, { keyframes } from 'styled-components';

export const skeletonBackground = keyframes`
  0%    { background-color: rgba(165, 165, 165, 0.1) }
  50%   { background-color: rgba(165, 165, 165, 0.3) }
  100%  { background-color: rgba(165, 165, 165, 0.1) }
`;

export const Wrapper = styled.div`
  width: 240px;
  height: 360px;
`;

export const Image = styled.div`
  width: 100%;
  height: 282px;

  animation: ${skeletonBackground} 1s infinite;
`;

export const InfoBox = styled.div`
  display: flex;
  justify-content: space-between;

  width: 282px;
  padding-top: 8px;
`;

export const LabelBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;

  width: 100%;
`;

export const Name = styled.p`
  width: 60%;
  height: 16px;
  margin-top: 4px;
  border-radius: 4px;

  animation: ${skeletonBackground} 1s infinite;
`;

export const Price = styled.p`
  width: 40%;
  height: 20px;
  margin-top: 10px;
  border-radius: 5px;

  animation: ${skeletonBackground} 0.7s infinite;
`;
