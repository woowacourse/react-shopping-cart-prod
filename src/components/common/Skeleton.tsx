import { styled } from "styled-components";

interface SkeletonStyleProps {
  width: string;
  height: string;
  background: string;
  position: string;
}

const Skeleton = (props: SkeletonStyleProps) => {
  return <Wrapper {...props}></Wrapper>;
};

const Wrapper = styled.div<SkeletonStyleProps>`
  background: ${(props) => props.background};
  width: ${(props) => props.width};
  height: ${(props) => props.height};
  position: ${(props) => props.position};
`;

export default Skeleton;
