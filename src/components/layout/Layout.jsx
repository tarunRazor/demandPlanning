import React from "react";
import Sidebar from "./Sidebar";
import Searchbar from "./SearchBar";
import { useState, useContext } from "react";
import Setting from "../../assets/icons/Settings";
import Users from "../../assets/icons/Users";
import Profile from "../../assets/icons/Profile";
import Home from "../../pages/Core/Admin/Dashboard";
import Login from "../Authentication/Login/login";
import { AppContext } from "../../contexts/AppContext";

const userNavigation = [
  { name: "Profile", href: "#", icon: Profile },
  { name: "Settings", href: "#", icon: Setting },
  { name: "Users", href: "#", icon: Users },
];

function Layout({ children }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { logoutStatus, loginStatus, showToast, setShowToast } =
    useContext(AppContext);

  return (
    <>
      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />
      <div className="lg:pl-72 h-full">
        <Searchbar
          userNavigation={userNavigation}
          sidebarOpen={sidebarOpen}
          setSidebarOpen={setSidebarOpen}
        />
        <main>
          <div className="p-4 sm:p-6 lg:p-8">{children}</div>

          {/* {showToast && <Toast isVisible={showToast}
            onClose={setShowToast} />} */}
        </main>
      </div>
    </>
  );
}

export default Layout;
