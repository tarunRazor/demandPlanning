import React from "react";
import LeftArrow from "../../../../assets/icons/LeftArrow";
import { useNavigate } from "react-router-dom";
import { DataTable } from "../../../../components/ui/TableData/data-table";
import { filters } from "./tableData/filterdata";
import { columns } from "./tableData/columns";
import { useQuery } from "@tanstack/react-query";

import TableSkeleton from "../../../../components/ui/TableData/TableSkeleton";
import useApiEndpoints from "@/Hooks/apiHooks";

function Core() {
  const { demandPlanUploadsUser } = useApiEndpoints();
  const navigate = useNavigate();
  const {
    data: data,
    isError: isError,
    isLoading: isLoading,
    error,
  } = useQuery({
    queryKey: ["CoreMain"],
    queryFn: async () => {
      const response = await demandPlanUploadsUser();
      return response.data.data;
    },
  });
  console.log("data for dp", data);
  if (isLoading) {
    return <div>{<TableSkeleton />}</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }

  const mainFilterData = filters(data);
  const mainColData = columns({ data: mainFilterData, navigate });

  return (
    <>
      <div className="flex justify-between">
        <h1 className={"cursor-pointer flex"}>
          <span className="ml-2"> Core Demand Planning</span>
        </h1>
      </div>
      <div className="mt-4">
        <DataTable
          Filterdata={mainFilterData}
          statusTitle={"status"}
          StatusData={mainFilterData}
          data={data}
          columns={mainColData}
        />
      </div>
    </>
  );
}

export default Core;
