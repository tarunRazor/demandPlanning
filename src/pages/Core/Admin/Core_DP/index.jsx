import React from "react";
import LeftArrow from "../../../../assets/icons/LeftArrow";
import { useNavigate } from "react-router-dom";
import { DataTable } from "../../../../components/ui/TableData/data-table";
import { filters } from "./tableData/filterdata";
import { columns } from "./tableData/columns";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import TableSkeleton from "../../../../components/ui/TableData/TableSkeleton";
import axios from "axios";
const dummyData = [
  {
    DP_Date: "03.05.2024",
    of_ASIN_x_MP: "5000",
    Items_reviewed: "4500",
    Items_Pending: "500",
    Submission_Status: "Submitted",
  },
  {
    DP_Date: "03.04.2024",
    of_ASIN_x_MP: "6000",
    Items_reviewed: "6000",
    Items_Pending: "0",
    Submission_Status: "Approved",
  },
  {
    DP_Date: "03.03.2024",
    of_ASIN_x_MP: "6000",
    Items_reviewed: "6000",
    Items_Pending: "0",
    Submission_Status: "Approved",
  },
];
function Core() {
  const navigate = useNavigate();
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
  const mainColData = columns({ mainFilterData, navigate });

  return (
    <>
      <div className="flex justify-between">
        <h1 onClick={() => navigate("/")} className={"cursor-pointer flex"}>
          <LeftArrow />
          <span className="ml-2"> Core Demand Planning</span>
        </h1>

        <button className="btn-default btn">Assign Reviews </button>
      </div>
      <div className="mt-4">
        <DataTable
          Filterdata={mainFilterData.Pos}
          statusTitle={"Submission_Status"}
          StatusData={mainFilterData.Status}
          data={dummyData}
          columns={mainColData}
        />
      </div>
    </>
  );
}

export default Core;
