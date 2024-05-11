import {
  React,
  useState,
  useCallback,
  useEffect,
  useMemo,
  useContext,
} from "react";
import { Skeleton } from "@/components/ui/skeleton";
import { useNavigate, useParams } from "react-router-dom";
import LeftArrow from "@/assets/icons/LeftArrow";

import { useQuery } from "@tanstack/react-query";
import TableSkeleton from "@/components/ui/TableData/TableSkeleton";
import axios from "axios";
import DownArrow from "@/assets/icons/downArrow";
import Table from "@/components/common/Table";
import { AppContext } from "@/contexts/AppContext";
import useApiEndpoints from "@/Hooks/apiHooks";
import TableauViz from "@/components/layout/TableauViz";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
const TableHeaderData = [
  { id: "parent_asin", label: "Parent ASIN" },
  { id: "marketplace", label: "Market Place" },
  { id: "suggested_quantity", label: "Suggested Qty |(next 12 M)" },
  { id: "final_quantity", label: "Final Qty|(next 12 M)" },
  { id: "delta", label: "Delta" },
  { id: "demand_plan_upload_timestamp", label: "DP Date" },
  { id: "lastUpdated", label: "Last Updated" },
  { id: "status", label: "Status" },
];
const TableHeaderData2 = [
  { id: "demand_plan_month", label: "Month" },
  { id: "grossSales", label: "Gross Sales" },
  { id: "promotions", label: "Promotions" },
  { id: "netRevenue", label: "Net revenue" },
  { id: "ppc", label: "PPC" },
  { id: "cm3", label: "CM3" },
  { id: "grossAsp", label: "Gross ASP" },
  { id: "netAsp", label: "Net ASP" },
  { id: "soldFy22", label: "# sold FY22" },
  { id: "soldFy23", label: "# sold FY23" },
  { id: "suggested_quantity", label: "DP Suggested" },
  { id: "final_quantity", label: "Final DP QTY" },
];
const TableData = [
  {
    parentASIN: "364374",
    marketPlace: "US",
    suggestedQty: "45",
    finalQty: "45",
    delta: "-25%",
    assignedTo: "Tushar",
    lastUpdated: "16.04.2024",
    status: "Pending",
  },
];
function SingleAsin() {
  const { userGroups } = useContext(AppContext);
  const [currentPage, setCurrentPage] = useState(0);
  const [selectedAsin, setSelectedAsin] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const navigate = useNavigate();
  const { parent_asin, marketplace, demand_plan_upload_timestamp } =
    useParams();
  const ASIN_PER_PAGE = 15;
  const { fetchTableauTokenUser, singleAsinUser, parentAsinUser } =
    useApiEndpoints();
  //const { setSidebarCollapse } = useContext(AppContext);

  const getToken = async () => {
    try {
      const response = await fetchTableauTokenUser();
      return response.data;
    } catch (error) {
      console.error("Error fetching fetchTableauToken:", error);
      throw error;
    }
  };

  const {
    data: Token = {},
    isLoading: isLoadingTableauToken,
    isError: isErrorTableauToken,
  } = useQuery({
    queryKey: ["TableauToken"],
    queryFn: getToken,
  });

  const fetchAsinList = async () => {
    try {
      const response = await parentAsinUser({
        parent_asin: parent_asin,
        key: demand_plan_upload_timestamp,
      });

      return response.data.data;
    } catch (error) {
      console.error("Error fetching ASIN list:", error);
      throw error;
    }
  };

  const {
    data: asinListAll = [],
    isLoading: isLoadingAsinList,
    isError,
    isFetched: isFetched,
  } = useQuery({
    queryKey: ["asinList"],
    queryFn: fetchAsinList,
  });

  const asinList = asinListAll.filter(
    (item) => item.parent_asin === parent_asin
  );

  const filteredAsinList = asinList.filter(
    (item) => item.parent_asin === parent_asin
  );

  const filteredData_final_quantity = asinList.filter(
    (item) => item.final_quantity
  );
  const final_quantity = filteredData_final_quantity.map(
    (item) => item.final_quantity
  );

  const filteredData_suggested_quantity = asinList.filter(
    (item) => item.suggested_quantity
  );
  const suggested_quantity = filteredData_suggested_quantity.map(
    (item) => item.final_quantity
  );

  const delta =
    ((final_quantity - suggested_quantity) / suggested_quantity) * 100;

  const allAsinsList = filteredAsinList.flatMap((item) => item.asins);
  const allAsins = [...new Set(allAsinsList)];

  // console.log(
  //   demand_plan_upload_timestamp,
  //   "-",
  //   filteredAsinList[0].demand_plan_upload_timestamp
  // );
  // filteredAsinList &&
  //   console.log(filteredAsinList[0].demand_plan_upload_timestamp);
  useEffect(() => {
    if (allAsins.length > 0 && !selectedAsin) {
      setSelectedAsin(allAsins[0]);
    }
  }, [allAsins]);

  const fetchAsinDetails = async () => {
    try {
      const response = await singleAsinUser({
        asin: selectedAsin,
        marketplace: marketplace,
        parentAsin: parent_asin,
        upload_timestamp: demand_plan_upload_timestamp,
      });

      return response.data.data;
    } catch (error) {
      console.error("Error fetching ASIN list:", error);
      throw error;
    }
  };

  const { data: asinDetailsData, isLoading: isLoadingAsinDetails } = useQuery({
    queryKey: ["asinDetails", selectedAsin],
    queryFn: fetchAsinDetails,
    enabled: !!selectedAsin,
  });

  if (isLoadingAsinDetails && isLoadingAsinList) {
    return <TableSkeleton />;
  }

  const handlePagination = useCallback(
    (direction) => {
      setCurrentPage((prevPage) => {
        const newIndex = direction === "next" ? prevPage + 1 : prevPage - 1;
        return Math.max(
          0,
          Math.min(newIndex, Math.ceil(allAsins.length / ASIN_PER_PAGE) - 1)
        );
      });
    },
    [allAsins.length]
  );

  const selectAsin = useCallback((id) => {
    setSelectedAsin(id);
  }, []);

  const startIndex = currentPage * ASIN_PER_PAGE;
  const endIndex = Math.min(startIndex + ASIN_PER_PAGE, allAsins.length);
  const itemsToShow = allAsins.slice(startIndex, endIndex);
  const nextDisabled = endIndex >= allAsins.length;
  const prevDisabled = currentPage === 0;
  //Token ? setSidebarCollapse(true) : undefined;
  return (
    <div>
      <div className="flex justify-between">
        <h2
          onClick={() => {
            navigate(`/core/user/parentAsin/${demand_plan_upload_timestamp}`);
          }}
          className={"cursor-pointer  items-center flex h2"}
        >
          <LeftArrow />
          <p className="ml-2 flex items-center">Parent {parent_asin}</p>
        </h2>

        <div className="flex gap-5">
          <button className="btn btn-default">Save</button>
          <button disabled className="btn btn-default ">
            Lock Submission
          </button>
        </div>
      </div>
      <div className="mt-4">
        <Table
          delta={delta}
          TableData={asinList}
          // handleAccept={handleAccept}
          TableHeaderData={TableHeaderData}
          // handleReject={handleReject}
        />
      </div>

      <div className="mt-6  mb-16 [&_table]:rounded-b-lg [&_table]:rounded-t-none ">
        {isLoadingAsinList && <TableSkeleton />}
        <div className="flex ring-1 ring-border-subtle items-center rounded-t-lg px-3 py-2 justify-between ">
          <div className="flex flex-1 items-center space-x-5 overflow-hidden max-w-[85%]">
            {itemsToShow.map((item) => (
              <button
                onClick={() => selectAsin(item)}
                key={item}
                className={`btn  ${
                  selectedAsin === item ? "bg-background-alt" : ""
                }`}
              >
                {item}
              </button>
            ))}
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => handlePagination("prev")}
              className="btn disabled:opacity-45 disabled:bg-transparent bg-background-alt"
              disabled={prevDisabled}
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </button>
            <button
              onClick={() => handlePagination("next")}
              className="btn disabled:opacity-45 disabled:bg-transparent bg-background-alt"
              disabled={nextDisabled}
            >
              <ChevronRightIcon className="h-4 w-4" />
            </button>
          </div>
        </div>
        {isLoadingAsinDetails && (
          <div className="min-w-full mx-[-1px] divide-y rounded-b-lg   relative  border-x border-border-subtle whitespace-nowrap caption-bottom ">
            {Array.from({ length: 8 }, (_, index) => (
              <div key={index} className="px-3 py-2  flex justify-between">
                {Array.from({ length: 8 }, (_, index) => (
                  <div className="p-2" key={index}>
                    <Skeleton className="w-[100px]  h-[10px] rounded-md" />
                  </div>
                ))}
              </div>
            ))}
          </div>
        )}
        {asinDetailsData && (
          <Table
            TableData={asinDetailsData}
            TableHeaderData={TableHeaderData2}
          />
        )}
      </div>

      {isLoadingTableauToken ? (
        <h1>Loading Tableau...</h1>
      ) : Token ? (
        <TableauViz
          token={Token.token}
          StartUrl={
            "https://analytics.razor-group.com/#/views/ASINReview-PurchasingDecisions/PurchasingDecisions?:iid=1"
          }
        />
      ) : null}
    </div>
  );
}

export default SingleAsin;
