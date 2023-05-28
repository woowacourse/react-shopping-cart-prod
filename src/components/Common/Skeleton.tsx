import styled, { css } from 'styled-components';

interface SkeletonProps {
  content: 'product' | 'cart';
}

const Skeleton = ({ content }: SkeletonProps) => {
  return (
    <Wrapper content={content}>
      <ImageBox content={content} />
      <TextBox content={content} />
    </Wrapper>
  );
};

export default Skeleton;

const Wrapper = styled.div<SkeletonProps>`
  display: flex;
  flex-direction: ${({ content }) => (content === 'cart' ? 'row' : 'column')};
  gap: 20px;
`;

const ImageStyled = {
  small: css`
    width: 144px;
    height: 144px;

    background-image: linear-gradient(90deg, #aaa 25%, #f0f0f0 50%, #aaa 75%);
    background-size: 300% 100%;

    @media (max-width: 420px) {
      width: 80px;
      height: 80px;
    }

    @keyframes skeleton-animation {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
    animation: skeleton-animation 3s ease-in-out infinite;
  `,
  medium: css`
    width: 282px;
    height: 282px;

    background-image: linear-gradient(90deg, #aaa 25%, #f0f0f0 50%, #aaa 75%);
    background-size: 300% 100%;

    @keyframes skeleton-animation {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
    animation: skeleton-animation 3s ease-in-out infinite;
  `,
};

const TextStyled = {
  small: css`
    width: 300px;
    height: 30px;

    background-image: linear-gradient(90deg, #aaa 25%, #f0f0f0 50%, #aaa 75%);
    background-size: 300% 100%;

    @media (max-width: 420px) {
      width: 80px;
      height: 80px;
    }

    @keyframes skeleton-animation {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
    animation: skeleton-animation 3s ease-in-out infinite;
  `,
  medium: css`
    width: 282px;
    height: 30px;

    background-image: linear-gradient(90deg, #aaa 25%, #f0f0f0 50%, #aaa 75%);
    background-size: 300% 100%;

    @keyframes skeleton-animation {
      0% {
        background-position: 0% 50%;
      }
      50% {
        background-position: 100% 50%;
      }
      100% {
        background-position: 0% 50%;
      }
    }
    animation: skeleton-animation 3s ease-in-out infinite;
  `,
};

const ImageBox = styled.div<SkeletonProps>`
  ${({ content }) =>
    content === 'cart' ? ImageStyled['small'] : ImageStyled['medium']}
`;

const TextBox = styled.div<SkeletonProps>`
  ${({ content }) =>
    content === 'cart' ? TextStyled['small'] : TextStyled['medium']}
`;
