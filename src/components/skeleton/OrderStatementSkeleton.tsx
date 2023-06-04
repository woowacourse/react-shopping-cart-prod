import { styled } from "styled-components";

const OrderStatementSkeleton = () => {
  return (
    <>
      <Wrapper height="150" />
      <Wrapper height="30" />
      <Wrapper height="15" />
      <Wrapper height="10" />
    </>
  );
};

interface WrapperProps {
  height: string;
}

const Wrapper = styled.div<WrapperProps>`
  background-color: var(--primary-beige-color);
  border-radius: 5px;

  height: ${(props) => props.height}px;
  width: 100%;
  margin: 2% 0;
`;

export default OrderStatementSkeleton;
