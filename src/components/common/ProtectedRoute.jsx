import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";

import { AppContext } from "../../contexts/AppContext";
import Layout from "../../components/layout/Layout";

const ProtectedRoute = ({ allowedGroups }) => {
  const { loginStatus, userGroups } = useContext(AppContext);

  const isAuthorized = () => {
    return (
      loginStatus && allowedGroups.some((group) => userGroups.includes(group))
    );
  };

  if (loginStatus === false) {
    return <Navigate to="/login" />;
  }
  return isAuthorized() ? (
    <Layout>
      <Outlet />
    </Layout>
  ) : (
    (console.log("unauthorised route"), (<Navigate to="/unauthorised" />))
  );
};

export default ProtectedRoute;
