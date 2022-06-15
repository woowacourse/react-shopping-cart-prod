import { Navigate } from "react-router-dom";
import useToken from "@/hooks/useToken";

function RequireAuth({ children }) {
  const [token] = useToken();

  if (!token) {
    return <Navigate to="/login" />;
  }

  return children;
}

export default RequireAuth;
