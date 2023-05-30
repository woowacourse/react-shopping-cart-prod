import styled, { keyframes } from 'styled-components';

const moveSlightly = keyframes`
  0%, 100% { transform: translate(-50%, -50%); }
  50% { transform: translate(-60%, -60%); }
`;

export const EmptyComponentWrapper = styled.div`
  position: absolute;
  width: 35%;
  top: 60%;
  left: 50%;
  transform: translate(-50%, -50%);
  text-align: center;
`;

export const EmptyImage = styled.img`
  position: absolute;
  top: 0;
  left: 50%;
  width: 300px;
  height: 300px;
  transform: translate(-50%, 0);
  animation: ${moveSlightly} 2s infinite;
`;

export const EmptyText = styled.p`
  position: absolute;
  top: 140px;
  width: 100%;
  text-align: center;
`;
