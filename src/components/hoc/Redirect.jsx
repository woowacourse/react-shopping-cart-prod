import { Navigate, Outlet } from "react-router-dom";

function Redirect({ redirectCondition, redirectPath }) {
  return redirectCondition ? (
    <Navigate replace to={redirectPath} />
  ) : (
    <Outlet />
  );
}

export default Redirect;
