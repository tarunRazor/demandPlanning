import { React, useState } from "react";
import Table from "../../../components/common/Table";
import ApproveUser from "../../../components/common/ApproveUserDialog";
import Toast from "../../../components/common/Toast";
const TableData = [
  {
    name: "John",
    email: "John123@razor.suite.com",
    app: "Vendor Portal",
    role: "Supply Manager",
    actions: ["Accept", "Reject"],
    proxy: [{ VendorProxy: true, InventoryProxy: true }],
  },
  {
    name: "Lisa",
    email: "John123@razor.suite.com",
    app: "Prime Pilot",
    role: "Inventory Manager",
    actions: ["Accept", "Reject"],
    proxy:  false 
  },
  {
    name: "Gaurav",
    email: "John123@razor.suite.com",
    app: "Portfolio Steering",
    role: "Co-Admin",
    actions: ["Accept", "Reject"],
    proxy: false
  },
  {
    name: "Tarun",
    email: "John123@razor.suite.com",
    app: "Prime Pilot",
    role: "Sale Price Manager",
    actions: ["Accept", "Reject"],
    proxy: false
  },
];

const TableHeaderData = [
  { id: "name", label: "name" },
  { id: "email", label: "Email" },
  { id: "app", label: "app" },
  { id: "role", label: "Role" },
  { id: "actions", label: "actions" },
];

function ReviewInvites() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [showToast, SetShowToast] = useState(false);
  const [approveUserData, setApproveUserData] = useState({});

  const setToast = () => {
    SetShowToast(true);
  };
  const hideToast = () => {
    SetShowToast(false);
  };

  const handleAccept = (cellValue) => {
    setDialogOpen(true);
    setApproveUserData(cellValue);
    console.log("Accept", cellValue);
  };

  const handleReject = (cellValue) => {
    console.log("Reject", cellValue);
  };
  return (
    <div>
      <>
        <div className="flex justify-between items-center">
          <h1 className="text-title font-bold">Internal team review invites</h1>
          <button className="btn btn-primary" onClick={() => approveUser(true)}>
            Add User
          </button>
        </div>

        <Table
          TableData={TableData}
          handleAccept={handleAccept}
          TableHeaderData={TableHeaderData}
          handleReject={handleReject}
        />
      </>

      {dialogOpen && (
        <ApproveUser
          setDialogOpen={setDialogOpen}
          item={approveUserData}
          open={dialogOpen}
          setToast={setToast}
        />
      )}

      {showToast && (
        <Toast
          isVisible={showToast}
          onClose={hideToast}
          text={approveUserData.name + " added successfully"}
        />
      )}
    </div>
  );
}

export default ReviewInvites;
