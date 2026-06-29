import React from "react";
import { useSelector } from "react-redux";
import PublicHeader from "./PublicHeader";
import AdminHeader from "./AdminHeader";

export default function Header() {
  const authStatus = useSelector((state) => state.AuthReducer?.status || false);

  // Serve the correct UI based on the gatekeeper status
  return authStatus ? <AdminHeader /> : <PublicHeader />;
}