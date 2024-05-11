import Table from "@/components/common/Table";
import React from "react";
import DialogPopup from "@/components/common/DialogPopup";
import { useState } from "react";
const asinData = {
  total_asin: 400,
  ASIN_Reviewed: 400,
  ASIN_Pending: 4000,
};
const TableHeaderData = [
  { id: "users", label: "Users" },
  { id: "percentAsinsReviewed", label: "% of ASINS|Reviewed" },
  { id: "asinsPending", label: "# ASINs Pending" },
  { id: "asinsAssigned", label: "# ASINs Assigned" },
  { id: "status", label: "Status" },
];
const TableData = [
  {
    users: "User A",
    percentAsinsReviewed: "N/A",
    asinsPending: "N/A",
    asinsAssigned: "1000",
    status: "N/A",
  },
  {
    users: "User B",
    percentAsinsReviewed: "N/A",
    asinsPending: "N/A",
    asinsAssigned: "1000",
    status: "N/A",
  },
  {
    users: "User C",
    percentAsinsReviewed: "N/A",
    asinsPending: "N/A",
    asinsAssigned: "1000",
    status: "N/A",
  },
  {
    users: "User D",
    percentAsinsReviewed: "N/A",
    asinsPending: "N/A",
    asinsAssigned: "1000",
    status: "N/A",
  },
];

function Review() {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <h1>Assign Reviews</h1>
      <div className="mt-6 flex justify-between  pb-4 border-b border-border-subtle">
        <div className="flex items-center font-semibold">
          <h2 className="mr-3 text-title">Total ASIN </h2>
          <p className="text-subtitle">{asinData.total_asin}</p>
        </div>
        <div className="flex items-center font-semibold">
          <h2 className="mr-3 text-title">ASIN Reviewed</h2>
          <p className="text-subtitle">{asinData.ASIN_Reviewed}</p>
        </div>
        <div className="flex items-center font-semibold">
          <h2 className="mr-3 text-title">ASIN Pending </h2>
          <p className="text-subtitle">{asinData.ASIN_Pending}</p>
        </div>
      </div>
      <div className="mt-12">
        <div className="flex items-center justify-between mb-4">
          <h2>Task</h2>
          <button
            onClick={() => {
              setOpen(true);
            }}
            className="btn btn-secondary"
          >
            Finalise Assignments
          </button>
        </div>
        <Table TableData={TableData} TableHeaderData={TableHeaderData} />
      </div>
      <DialogPopup setOpen={setOpen} open={open} />
    </div>
  );
}

export default Review;
