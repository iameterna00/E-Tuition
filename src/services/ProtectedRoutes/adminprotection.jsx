import { Navigate, Outlet } from "react-router-dom";

const AdminRoute = () => {
  const token = localStorage.getItem("token");
  const isAdmin = localStorage.getItem("isAdmin") === "true";

  return token && isAdmin ? <Outlet /> : <Navigate to="/
  " />;
};

export default AdminRoute;
