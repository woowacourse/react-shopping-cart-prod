import styled, { keyframes } from 'styled-components';

export const LoadingAnimation = keyframes`
  0% {
    background-position: -200px 0;
  }
  100% {
    background-position: calc(200px + 100%) 0;
  }
`;

export const SkeletonElement = styled.div`
  display: inline-block;
  height: 83%;
  background: linear-gradient(90deg, #f0f0f0 25%, #f8f8f8 50%, #f0f0f0 75%);
  background-size: 200px 100%;
  animation: ${LoadingAnimation} 1s infinite;
`;

export const SkeletonItemWrapper = styled(SkeletonElement)`
  width: 260px;
  margin: 21px;
  border-radius: 12px;
`;

export const SkeletonImageOverflowContainer = styled(SkeletonElement)`
  overflow: hidden;
  border-radius: 12px;
  width: 100%;
  height: 160px;
`;

export const SkeletonItemTitle = styled(SkeletonElement)`
  width: 70%;
  height: 20px;
`;

export const SkeletonItemPrice = styled(SkeletonElement)`
  width: 30%;
  height: 20px;
`;

export const SkeletonItemInfo = styled.div`
  width: 100%;
  padding: 18px 12px;
`;

export const SkeletonItemInfoUpperBoundary = styled.div`
  display: flex;
  justify-content: space-between;
  height: 56px;
`;

export const SkeletonButton = styled(SkeletonElement)`
  width: 40px;
  height: 40px;
`;
