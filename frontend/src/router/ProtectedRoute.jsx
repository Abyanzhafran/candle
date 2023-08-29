import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

export default function ProtectedRoute({ element, ...rest }) {
  const loggedIn = Cookies.get("loggedIn") === "true";

  if (!loggedIn) {
    return <Navigate to="/signin" />;
  }

  return <element {...rest} />;
}
