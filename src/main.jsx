import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import "./index.css";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Account } from "@/components/Authentication/Account";
import { SessionContextProvider } from "./contexts/SessionContext";
import { AppContextProvider } from "./contexts/AppContext";
import { DataContextProvider } from "./contexts/DataContext";
const queryClient = new QueryClient();
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SessionContextProvider>
      <BrowserRouter>
        <QueryClientProvider client={queryClient}>
          <AppContextProvider>
            <DataContextProvider>
              <Account>
                <App />
              </Account>
            </DataContextProvider>
          </AppContextProvider>
        </QueryClientProvider>
      </BrowserRouter>
    </SessionContextProvider>
  </React.StrictMode>
);
