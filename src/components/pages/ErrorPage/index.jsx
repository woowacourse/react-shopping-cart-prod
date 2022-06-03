import React from "react";
import { theme } from "style";

function ErrorPage({ children }) {
  return (
    <div style={{ color: theme.color.point, fontSize: theme.fontSize.medium }}>
      {children}
    </div>
  );
}

export default ErrorPage;
