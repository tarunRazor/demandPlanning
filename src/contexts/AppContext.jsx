import React from "react";

export const AppContext = React.createContext();

export const AppContextProvider = ({ children }) => {
  const [idToken, setIdToken] = React.useState("");
  const [refreshToken, setRefreshToken] = React.useState("");
  const [accessToken, setAccessToken] = React.useState("");
  const [loginStatus, setLoginStatus] = React.useState(false);
  const [sidebarCollapse, setSidebarCollapse] = React.useState(false);
  const [userGroups, setUserGroups] = React.useState([]);
  const [showToast, SetShowToast] = React.useState(false);

  return (
    <AppContext.Provider
      value={{
        idToken,
        setIdToken,
        refreshToken,
        setRefreshToken,
        accessToken,
        setAccessToken,
        loginStatus,
        setLoginStatus,
        sidebarCollapse,
        setSidebarCollapse,
        userGroups,
        setUserGroups,
        showToast,
        SetShowToast,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
