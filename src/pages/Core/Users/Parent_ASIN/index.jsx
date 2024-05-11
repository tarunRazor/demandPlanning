import React from "react";
import LeftArrow from "../../../../assets/icons/LeftArrow";
import { useParams, useNavigate } from "react-router-dom";
import { DataTable } from "../../../../components/ui/TableData/data-table";
import { filters } from "./tableData/filterdata";
import { columns } from "./tableData/columns";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/skeleton";
import TableSkeleton from "../../../../components/ui/TableData/TableSkeleton";
import useApiEndpoints from "@/Hooks/apiHooks";
import useDateFormat from "@/Hooks/useDateFormat";
function parentAsin() {
  const { parentAsinUser, demandPlanUploadsUser } = useApiEndpoints();
  const navigate = useNavigate();

  const { demand_plan_upload_timestamp } = useParams();
  const formattedDate = useDateFormat(demand_plan_upload_timestamp);
  const {
    data: CoreData,
    isError: isCoreError,
    isLoading: isCoreLoading,
    CoreError,
  } = useQuery({
    queryKey: ["CoreMain"],
    queryFn: async () => {
      const response = await demandPlanUploadsUser();
      return response.data.data;
    },
  });

  const CurrentDP = CoreData?.find(
    (item) =>
      item.demand_plan_upload_timestamp === demand_plan_upload_timestamp ||
      "No match found"
  );

  const {
    data: data,
    isError: isError,
    isLoading: isLoading,
    error,
  } = useQuery({
    queryKey: ["parentAsinUserKey"],
    queryFn: async () => {
      const response = await parentAsinUser({
        key: demand_plan_upload_timestamp,
      });
      return response.data.data;
    },
  });

  if (isLoading) {
    return <div>{<TableSkeleton />}</div>;
  }

  if (isError) {
    return <div>{error.message}</div>;
  }
  const mainFilterData = filters(data);

  const mainColData = columns({
    data: mainFilterData,
    navigate,
    demand_plan_upload_timestamp,
  });

  return (
    <>
      {demand_plan_upload_timestamp && (
        <div className="flex justify-between">
          <h1 onClick={() => navigate(`/`)} className={"cursor-pointer flex"}>
            <LeftArrow />
            <span className="ml-2">DP Date - {formattedDate}</span>
          </h1>
        </div>
      )}
      <div className="mt-12 mb-4 flex justify-between  pb-4 border-b border-border-subtle">
        <div className="flex items-center font-semibold">
          <h2 className="mr-3 text-title">Total ASIN </h2>
          <p className="text-subtitle">
            {isCoreLoading ? (
              <div className="animate-pulse h-2 w-16 rounded-md bg-background-alt dark:bg-slate-800"></div>
            ) : CurrentDP ? (
              CurrentDP.total_asins
            ) : null}
          </p>
        </div>
        <div className="flex items-center font-semibold">
          <h2 className="mr-3 text-title">ASIN Reviewed</h2>
          <p className="text-subtitle">
            {isCoreLoading ? (
              <div className="animate-pulse h-2 w-16 rounded-md bg-background-alt dark:bg-slate-800"></div>
            ) : CurrentDP ? (
              CurrentDP.completed_asins
            ) : null}{" "}
          </p>
        </div>
        <div className="flex items-center font-semibold">
          <h2 className="mr-3 text-title">ASIN Pending </h2>
          <p className="text-subtitle">
            {" "}
            {isCoreLoading ? (
              <div className="animate-pulse h-2 w-16 rounded-md bg-background-alt dark:bg-slate-800"></div>
            ) : CurrentDP ? (
              CurrentDP.total_asins - CurrentDP.completed_asins
            ) : null}
          </p>
        </div>
      </div>

      <div className="mt-8">
        <DataTable
          label={"Review DPs"}
          Filterdata={mainFilterData}
          statusTitle={"Status"}
          StatusData={mainFilterData}
          data={data}
          columns={mainColData}
        />
      </div>
    </>
  );
}

export default parentAsin;
