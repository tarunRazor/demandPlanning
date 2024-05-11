import React from "react";
import AppsCard from "../../../../components/common/AppsCard";
import ListCard from "../../../../components/common/ListCard";
import UserDialog from "../../../../components/common/DialogPopup";
import { useState, useCallback } from "react";
import Toast from "../../../../components/common/Toast";
import Table from "../../../../components/common/Table";

const AppsData = [
  {
    appName: "CORE",
    description:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
    actions: ["View Core DP", "Assign Tasks"],
  },

  ,
  {
    appName: "Latama",
    description:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
    actions: ["View DP", "Request Submission"],
  },
  {
    appName: "Latam",
    description:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
    actions: ["View DP", "Request Submission"],
  },

  {
    appName: "NPD",
    description:
      "Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries,",
    actions: ["View DP", "Request Submission"],
  },
];

const TableData = [
  {
    task: "Update CCRD for #PO536278",
    app: "Vendor Portal",
    status: "WIP",
    priority: "High",
  },
  {
    task: "Upload Invoice for #PO756373",
    app: "Prime Pilot",
    status: "Backlog",
    priority: "Medium",
  },
  {
    task: "Upload 6 images for Silvon 352672",
    app: "Portfolio Steering",
    status: "Done",
    priority: "Low",
  },
  {
    task: "Update CCRD for #PO536278",
    app: "Prime Pilot",
    status: "Backlog",
    priority: "Medium",
  },
];

const TableHeaderData = [
  { id: "task", label: "Task" },
  { id: "app", label: "App" },
  { id: "status", label: "status" },
  { id: "priority", label: "Priority" },
];

const userRole = ["Supply Manager", "Procurement Team", "Inventory Manager"];
function Home() {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [activeAppData, setActiveAppData] = useState(null);
  const [loginStatusCard, setLoginStatusCard] = useState("Ask To Join");
  const [showToast, SetShowToast] = useState(false);

  const handleDialogOpen = useCallback(
    (item) => () => {
      setActiveAppData(item);
      setDialogOpen(true);
    },
    []
  );

  const setToast = () => {
    SetShowToast(true);
  };
  const hideToast = () => {
    SetShowToast(false);
  };

  const handleCloseDialog = useCallback(() => {
    setDialogOpen(false);
    setActiveAppData(null);
  }, []);

  return (
    <div>
      <h1 className="text-title font-bold">Apps by Razor Suite</h1>
      <div className="grid  grid-cols-1 grid-rows-1 items-start sm:gap-x-6 gap-y-6 lg:grid-cols-1 mt-4">
        <div className="grid  grid-cols-1"></div>
        <div className="grid  grid-cols-1 grid-rows-1 col-span-2 lg:grid-cols-3 gap-x-8 gap-y-8 ">
          {AppsData.map((item, index) => {
            return <AppsCard index={index} key={item.appName} item={item} />;
          })}
          <div className="col-span-2 "></div>
        </div>
      </div>
      {dialogOpen && (
        <>
          <UserDialog
            setDialogOpen={setDialogOpen}
            setOpen={handleCloseDialog}
            item={activeAppData}
            open={dialogOpen}
            onAskToJoin={handleCloseDialog}
            userRole={userRole}
            setLoginStatusCard={setLoginStatusCard}
            setToast={setToast}
          />
        </>
      )}
      {showToast && (
        <Toast
          isVisible={showToast}
          onClose={hideToast}
          text={"Request submitted successfully"}
        />
      )}
    </div>
  );
}

export default Home;
