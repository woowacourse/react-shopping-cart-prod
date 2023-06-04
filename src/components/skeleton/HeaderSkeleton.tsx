import { styled } from "styled-components";

const HeaderSkeleton = () => {
  return <Wrapper />;
};

const Wrapper = styled.div`
  background: var(--primary-blue-color);
  width: 100%;
  height: 70px;
  position: fixed;
`;

export default HeaderSkeleton;
