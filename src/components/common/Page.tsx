import { ReactNode } from "react";
import styled from "styled-components";
import PageHeader from "./PageHeader";

const Page = ({
  children,
  pageName,
}: {
  children: ReactNode;
  pageName?: string;
}) => {
  return (
    <Wrapper>
      {pageName && <PageHeader>{pageName}</PageHeader>}
      <Container>{children}</Container>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  padding: 110px 5% 80px 5%;
`;

const Container = styled.div`
  width: 90%;
  margin: auto;
`;

export default Page;
