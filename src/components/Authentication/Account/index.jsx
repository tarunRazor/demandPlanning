import React, { createContext, useState } from "react";
import UserPool from "@/UserPool";
import { AuthenticationDetails, CognitoUser } from "amazon-cognito-identity-js";
import { useNavigate } from "react-router-dom";
import { AppContext } from "@/contexts/AppContext";
import { QueryClient } from "@tanstack/react-query";
const AccountContext = createContext();

const Account = ({ children }) => {
  const queryClient = new QueryClient();
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState(null);
  const { setLoginStatus, setUserGroups } = React.useContext(AppContext);

  const getSession = () => {
    return new Promise((resolve, reject) => {
      const user = UserPool.getCurrentUser();
      if (user) {
        user.getSession((err, session) => {
          if (err) {
            reject(err);
          } else {
            resolve(session);
          }
        });
      } else {
        reject("No current user");
      }
    });
  };

  const authenticate = (Username, Password) => {
    return new Promise((resolve, reject) => {
      const user = new CognitoUser({
        Username,
        Pool: UserPool,
      });

      const authDetails = new AuthenticationDetails({
        Username,
        Password,
      });

      user.authenticateUser(authDetails, {
        onSuccess: (result) => {
          setCurrentUser(result);
          resolve(result);
        },
        onFailure: (err) => {
          reject(err);
        },
        newPasswordRequired: (data) => {
          console.log("new password required", data);
          resolve(data);
        },
      });
    });
  };

  const logout = () => {
    const user = UserPool.getCurrentUser();
    if (user) {
      setUserGroups([]);
      user.signOut();
      setCurrentUser(null);
      setLoginStatus(false);
      queryClient.removeQueries();
      console.log("User logged out and groups cleared");
      navigate("/login", { replace: true });
    }
  };

  return (
    <AccountContext.Provider
      value={{ currentUser, authenticate, getSession, logout }}
    >
      {children}
    </AccountContext.Provider>
  );
};

export { Account, AccountContext };
