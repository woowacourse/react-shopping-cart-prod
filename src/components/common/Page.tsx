import { ReactNode, Suspense } from "react";
import styled from "styled-components";
import PageHeader from "./PageHeader";
import Skeleton from "./Skeleton";
import Header from "components/Header";

const Page = ({
  children,
  pageName,
}: {
  children: ReactNode;
  pageName?: string;
}) => {
  return (
    <>
      <Suspense
        fallback={
          <Skeleton
            {...{ background: "#333333", width: "100%", height: "70px" }}
          />
        }
      >
        <Header />
      </Suspense>
      <Wrapper>
        {pageName && <PageHeader>{pageName}</PageHeader>}
        <Container>{children}</Container>
      </Wrapper>
    </>
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
