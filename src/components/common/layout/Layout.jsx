import React from "react";
import { Outlet } from "react-router-dom";

import Header from "@/components/common/header/Header";

import ContentWrapper from "@/components/common/wrapper/ContentWrapper.styled";

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
