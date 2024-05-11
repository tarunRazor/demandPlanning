import { React, useState } from "react";
import Table from "../../components/common/Table";
import AddUser from "./AddUser";
import Toast from "../../components/common/Toast";
const TableData = [
  {
    name: "Alex Sam",
    email: "alexsamvendcor@razorsuite.com",
    lastActiveDate: null,
    role: "Supplier Manager",
    app: "Vendor Portal",
    status: "Pending",
  },
  {
    name: "Alex Sam",
    email: "alexsamvedndor@razorsuite.com",
    lastActiveDate: null,
    role: "Admin",
    app: "Portfolio Steering",
    status: "Active",
  },
  {
    name: "Alex Sam",
    email: "alexsamvwendor@razorsuite.com",
    lastActiveDate: null,
    role: "Inventory Manager",
    app: "Prime Pilot",
    status: "Pending",
  },
  {
    name: "Alex Sam",
    email: "alexsamvendoddr@razorsuite.com",
    lastActiveDate: "28.03.2024",
    role: "FFW Manager",
    app: "Vendor Portal",
    status: "Active",
  },
];

const TableHeaderData = [
  { id: "name", label: "Name" },
  { id: "email", label: "Email" },
  { id: "lastActiveDate", label: "Last active date" },
  { id: "role", label: "Role" },
  { id: "app", label: "App" },
  { id: "status", label: "status" },
];

function UserManagement() {
  const [addUser, setAddUser] = useState(false);
  const [showToast, SetShowToast] = useState(false);

  const setToast = () => {
    SetShowToast(true);
  };
  const hideToast = () => {
    SetShowToast(false);
  };
  return (
    <div>
      {addUser ? (
        <AddUser setToast={setToast} setAddUser={setAddUser} />
      ) : (
        <>
          <div className="flex justify-between items-center">
            <h1 className="text-title font-bold">Users Management</h1>
            <button
              className="btn btn-primary"
              onClick={() => setAddUser(true)}
            >
              Add User
            </button>
          </div>

          <Table TableData={TableData} TableHeaderData={TableHeaderData} />
        </>
      )}

      {showToast && (
        <Toast
          isVisible={showToast}
          onClose={hideToast}
          text={"New user added successfully"}
        />
      )}
    </div>
  );
}

export default UserManagement;
