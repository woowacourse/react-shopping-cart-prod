import React from "react";
import { Outlet } from "react-router-dom";

import Header from "@/components/Header";

import ContentWrapper from "@/components/Wrapper/index.styled";

function Layout() {
  return (
    <>
      <Header />
      <ContentWrapper>
        <Outlet />
      </ContentWrapper>
    </>
  );
}

export default Layout;
