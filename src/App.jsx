import { useState } from "react";
import { useContext, useEffect } from "react";

import Login from "./components/Authentication/Login/login";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { AppContext } from "./contexts/AppContext";
import { AccountContext } from "@/components/Authentication/Account";
import ProtectedRoute from "./components/common/ProtectedRoute";
import AdminDashboard from "./pages/Core/Admin/Dashboard";
import CoreDP from "./pages/Core/Admin/Core_DP";
import { useQuery, QueryClient } from "@tanstack/react-query";
import ParentAsin from "./pages/Core/Admin/Parent_ASIN";
import ParentAsinUser from "./pages/Core/Users/Parent_ASIN";
import SingleAsin from "./pages/Core/Admin/Single_Asin";
import SingleAsinUser from "./pages/Core/Users/Single_Asin";
import Review from "./pages/Core/Admin/assignReview";
import UserDashboard from "./pages/Core/Users/Core_DP";
import UnAuthorised from "./components/Authentication/Unauthorised";
import UserPool from "@/UserPool";

function App() {
  const {
    loginStatus,
    setRefreshToken,
    setLoginStatus,
    setAccessToken,
    setIdToken,
    accessToken,
    userGroups,
    setUserGroups,
  } = useContext(AppContext);
  const { getSession } = useContext(AccountContext);

  useEffect(() => {
    getSession()
      .then((session) => {
        setLoginStatus(true);
        setIdToken(session.idToken.jwtToken);
        setAccessToken(session.accessToken.jwtToken);
        setRefreshToken(session.refreshToken.token);
        setUserGroups(session.idToken.payload["cognito:groups"]);
      })
      .catch((err) => {
        console.log("Session: ", err);
        setLoginStatus(false);
        setIdToken(null);
        setAccessToken(null);
        setRefreshToken(null);
      });
  }, []);

  const LoginWrapper = () => {
    const { loginStatus } = useContext(AppContext);
    if (loginStatus) {
      return <Navigate to="/" />;
    } else {
      return <Login />;
    }
  };

  const LogOutWrapper = () => {
    const currentUser = UserPool.getCurrentUser();
    if (currentUser) {
      currentUser.signOut();

      setLoginStatus(false);

      return <Navigate to="/login" />;
    }
  };

  return (
    <Routes>
      <Route path="/login" element={<LoginWrapper />} />
      <Route path="/logout" element={<LogOutWrapper />} />
      <Route path="/unauthorised" element={<UnAuthorised />} />
      <Route
        path="/"
        element={
          loginStatus && userGroups.length > 0 ? (
            userGroups.includes("dp_validation_admin") ? (
              <Navigate to="/admin-dashboard" />
            ) : (
              <Navigate to="/user-dashboard" />
            )
          ) : null
        }
      />

      <Route
        path="/"
        element={<ProtectedRoute allowedGroups={["dp_validation_admin"]} />}
      >
        <Route path="/admin-dashboard" element={<AdminDashboard />} />
        <Route path="/core" element={<CoreDP />} />
        <Route path="/core/parentAsin/:currentDate" element={<ParentAsin />} />
        <Route path="/core/asin/:currentDate/:asin" element={<SingleAsin />} />
        <Route path="/core/assign-reviews" element={<Review />} />
      </Route>

      <Route
        path="/"
        element={<ProtectedRoute allowedGroups={["dp_validation_team"]} />}
      >
        <Route path="/user-dashboard" element={<UserDashboard />} />
        <Route
          path="core/user/parentAsin/:demand_plan_upload_timestamp"
          element={<ParentAsinUser />}
        />

        <Route
          path="/core/user/asin/:demand_plan_upload_timestamp/:parent_asin/:marketplace"
          element={<SingleAsinUser />}
        />
      </Route>
    </Routes>
  );
}

export default App;
