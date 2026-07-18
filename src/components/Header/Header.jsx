// import React from "react";
// import { useSelector } from "react-redux";
// import PublicHeader from "./PublicHeader";
// import AdminHeader from "./AdminHeader";

// export default function Header() {
//   const authStatus = useSelector((state) => state.AuthReducer?.status || false);

//   // Serve the correct UI based on the gatekeeper status
//   return authStatus ? <AdminHeader /> : <PublicHeader />;
// }
import React from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import PublicHeader from "./PublicHeader";
import AdminHeader from "./AdminHeader";

export default function Header() {
  const authStatus = useSelector((state) => state.AuthReducer?.status || false);
  const location = useLocation();

  // Check if the current URL explicitly belongs to the admin panel
  const isAdminRoute = location.pathname.startsWith('/admin');

  // Only show the Admin Header if they are logged in AND inside the /admin zone
  return (authStatus && isAdminRoute) ? <AdminHeader /> : <PublicHeader />;
}