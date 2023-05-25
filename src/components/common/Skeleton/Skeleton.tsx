import { keyframes, styled } from 'styled-components';

interface SkeletonProps {
  type?: 'light' | 'dark';
}

const Skeleton = ({ type = 'light' }: SkeletonProps) => {
  return <Wrapper type={type} />;
};

const loading = keyframes`
  0% {
		transform: translateX(-100%);
	}
	50% {
		transform: translateX(100%);
	}
	100% {
		transform: translateX(100%);
	}
`;

const Wrapper = styled.div<{ type: SkeletonProps['type'] }>`
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-color: ${({ type }) =>
    type === 'light' ? `rgba(0, 0, 0, 0.09)` : `rgba(255, 255, 255, 0.17)`};
  border-radius: 10px;

  &::after {
    animation: ${loading} 1.5s linear 0.5s infinite;
    background: linear-gradient(
      90deg,
      transparent,
      ${({ type }) =>
        type === 'light' ? `rgba(0, 0, 0, 0.09)` : `rgba(255, 255, 255, 0.17)`},
      transparent
    );
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
  }
`;

export default Skeleton;
