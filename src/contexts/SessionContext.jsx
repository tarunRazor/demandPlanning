import React from "react";

export const SessionContext = React.createContext();

export const SessionContextProvider = ({ children }) => {
  const [userSession, setUserSession] = React.useState(null);
  return (
    <SessionContext.Provider value={{ userSession, setUserSession }}>
      {children}
    </SessionContext.Provider>
  );
};
