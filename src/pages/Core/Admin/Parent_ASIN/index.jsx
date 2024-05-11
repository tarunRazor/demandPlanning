import React from "react";
import LeftArrow from "../../../../assets/icons/LeftArrow";
import { useParams, useNavigate } from "react-router-dom";
import { DataTable } from "../../../../components/ui/TableData/data-table";
import { filters } from "./tableData/filterdata";
import { columns } from "./tableData/columns";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import TableSkeleton from "../../../../components/ui/TableData/TableSkeleton";
import axios from "axios";

const dummyData = [
  {
    Parent_ASIN: "364374",
    MP: "US",
    Suggested_Qty_next_12_M: 100,
    Final_Qty_next_12_M: 50,
    Delta: "-50%",
    Assigned_to: "Tushar",
    Last_Updated: "13.04.2024",
    Status: "Submitted",
  },
  {
    Parent_ASIN: "364374",
    MP: "US",
    Suggested_Qty_next_12_M: 60,
    Final_Qty_next_12_M: 45,
    Delta: "-25%",
    Assigned_to: "Tushar",
    Last_Updated: "16.04.2024",
    Status: "Submitted",
  },
  {
    Parent_ASIN: "27328",
    MP: "US",
    Suggested_Qty_next_12_M: 10,
    Final_Qty_next_12_M: 20,
    Delta: "+100%",
    Assigned_to: "Tushar",
    Last_Updated: "",
    Status: "Pending",
  },
  {
    Parent_ASIN: "27328",
    MP: "US",
    Suggested_Qty_next_12_M: 10,
    Final_Qty_next_12_M: 20,
    Delta: "+100%",
    Assigned_to: "Tushar",
    Last_Updated: "16.04.2024",
    Status: "Submitted",
  },
  {
    Parent_ASIN: "27328",
    MP: "US",
    Suggested_Qty_next_12_M: 20,
    Final_Qty_next_12_M: 20,
    Delta: "0%",
    Assigned_to: "Tushar",
    Last_Updated: "16.04.2024",
    Status: "Pending",
  },
  {
    Parent_ASIN: "364374",
    MP: "US",
    Suggested_Qty_next_12_M: 100,
    Final_Qty_next_12_M: 50,
    Delta: "+100%",
    Assigned_to: "Tushar",
    Last_Updated: "13.04.2024",
    Status: "Submitted",
  },
  {
    Parent_ASIN: "364374",
    MP: "US",
    Suggested_Qty_next_12_M: 60,
    Final_Qty_next_12_M: 45,
    Delta: "+100%",
    Assigned_to: "Tushar",
    Last_Updated: "16.04.2024",
    Status: "Submitted",
  },
  {
    Parent_ASIN: "27328",
    MP: "US",
    Suggested_Qty_next_12_M: 10,
    Final_Qty_next_12_M: 20,
    Delta: "0%",
    Assigned_to: "Tushar",
    Last_Updated: "",
    Status: "Pending",
  },
];
function Core() {
  const navigate = useNavigate();
  const { currentDate } = useParams();
  const {
    data: data,
    isError: isError,
    isLoading: isLoading,
    error,
  } = useQuery({
    queryKey: ["CoreMain"],
    queryFn: async () => {
      const response = await axios.get("https://dummyapi.online/api/todos");

      return response.data;
    },
  });

  if (isLoading) {
    return <div>{<TableSkeleton />}</div>;
  }

  const mainFilterData = filters(dummyData);

  const mainColData = columns({ data: mainFilterData, navigate, currentDate });

  return (
    <>
      {" "}
      {currentDate && (
        <div className="flex justify-between">
          <h1
            onClick={() => navigate(`/core`)}
            className={"cursor-pointer flex"}
          >
            <LeftArrow />
            <span className="ml-2">DP Date - {currentDate}</span>
          </h1>

          <button className="btn-default btn">Assign Reviews </button>
        </div>
      )}
      <div className="mt-4">
        <DataTable
          label={"Review DPs"}
          Filterdata={mainFilterData}
          statusTitle={"Status"}
          StatusData={mainFilterData}
          data={dummyData}
          columns={mainColData}
        />
      </div>
    </>
  );
}

export default Core;
