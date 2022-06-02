import React from "react";
import styled from "styled-components";

const Header = styled.h2`
  grid-area: header;

  width: 100%;
  height: fit-content;
  padding: 16px 0;

  text-align: center;
  border-bottom: 4px solid ${({ theme: { color } }) => color.gray01};
`;

function PageHeader({ children }) {
  return <Header>{children}</Header>;
}

export default PageHeader;
