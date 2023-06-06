import { styled } from "styled-components";

const PageHeader = ({ children }: { children: string }) => {
  return <Wrapper>{children}</Wrapper>;
};

const Wrapper = styled.div`
  margin: auto;
  width: 85%;
  border-bottom: 4px solid var(--primary-blue-color);
  border-bottom-style: double;

  height: 70px;

  display: flex;
  align-items: center;
  justify-content: center;

  margin-bottom: 5%;

  font-weight: 500;
  font-size: 2rem;
  letter-spacing: 2px;
`;

export default PageHeader;
