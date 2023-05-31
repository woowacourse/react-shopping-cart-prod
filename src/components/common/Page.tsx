import { ReactNode } from "react";
import styled from "styled-components";
import PageHeader from "./PageHeader";
import Skeleton from "./Skeleton";
import Header from "components/Header";
import ServerSelector from "components/ServerSelector";
import AsyncBoundary from "./AsyncBoundary";

const Page = ({
  children,
  pageName,
}: {
  children: ReactNode;
  pageName?: string;
}) => {
  return (
    <>
      <AsyncBoundary
        SuspenseFallback={
          <Skeleton
            {...{
              background: "#333333",
              width: "100%",
              height: "70px",
              position: "fixed",
            }}
          />
        }
        ErrorFallback={() => (
          <Skeleton
            {...{
              background: "#333333",
              width: "100%",
              height: "70px",
              position: "fixed",
            }}
          />
        )}
      >
        <Header />
      </AsyncBoundary>
      <Wrapper>
        {pageName && <PageHeader>{pageName}</PageHeader>}
        <Container>{children}</Container>
      </Wrapper>
      <ServerSelector />
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
