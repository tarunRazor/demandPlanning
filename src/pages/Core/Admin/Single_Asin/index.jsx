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

import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";
const TableHeaderData = [
  { id: "parentASIN", label: "Parent ASIN" },
  { id: "marketPlace", label: "Market Place" },
  { id: "suggestedQty", label: "Suggested Qty |(next 12 M)" },
  { id: "finalQty", label: "Final Qty|(next 12 M)" },
  { id: "delta", label: "Delta" },
  { id: "assignedTo", label: "Assigned to" },
  { id: "lastUpdated", label: "Last Updated" },
  { id: "status", label: "Status" },
];
const TableHeaderData2 = [
  { id: "month", label: "Month" },
  { id: "grossSales", label: "Gross Sales" },
  { id: "promotions", label: "Promotions" },
  { id: "netRevenue", label: "Net revenue" },
  { id: "ppc", label: "PPC" },
  { id: "cm3", label: "CM3" },
  { id: "grossAsp", label: "Gross ASP" },
  { id: "netAsp", label: "Net ASP" },
  { id: "soldFy22", label: "# sold FY22" },
  { id: "soldFy23", label: "# sold FY23" },
  { id: "dpSuggested", label: "DP Suggested" },
  { id: "finalDpQty", label: "Final DP QTY" },
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
  const navigate = useNavigate();
  const { currentDate, asin } = useParams();
  const ASIN_PER_PAGE = 15;
  const { fetchTableauToken } = useApiEndpoints();
  const { setSidebarCollapse } = useContext(AppContext);

  const getToken = async () => {
    try {
      const response = await fetchTableauToken();

      // Ensure this logs the expected array
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
      const response = await axios.get("https://dummyapi.online/api/todos");
      // Ensure this logs the expected array
      return response.data;
    } catch (error) {
      console.error("Error fetching ASIN list:", error);
      throw error;
    }
  };

  const {
    data: asinList = [],
    isLoading: isLoadingAsinList,
    isError,
    isFetched: isFetched,
  } = useQuery({
    queryKey: ["asinList"],
    queryFn: fetchAsinList,
  });

  useEffect(() => {
    if (asinList.length > 0 && !selectedAsin) {
      setSelectedAsin(asinList[0].id);
      console.log("Setting initial ASIN:", asinList[0].id);
    }
  }, [asinList]);

  const fetchAsinDetails = async () => {
    const response = await axios.get(
      `https://dummyapi.online/api/todos/${selectedAsin}`
    );
    return response.data;
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
          Math.min(newIndex, Math.ceil(asinList.length / ASIN_PER_PAGE) - 1)
        );
      });
    },
    [asinList.length]
  );

  const selectAsin = useCallback((id) => {
    setSelectedAsin(id);
  }, []);

  const startIndex = currentPage * ASIN_PER_PAGE;
  const endIndex = Math.min(startIndex + ASIN_PER_PAGE, asinList.length);
  const itemsToShow = asinList.slice(startIndex, endIndex);
  const nextDisabled = endIndex >= asinList.length;
  const prevDisabled = currentPage === 0;
  //Token ? setSidebarCollapse(true) : undefined;
  return (
    <div>
      <div className="flex justify-between">
        <h2
          onClick={() => {
            navigate(`/core/parentAsin/${currentDate}`);
          }}
          className={"cursor-pointer  items-center flex h2"}
        >
          <LeftArrow />
          <p className="ml-2 flex items-center">
            {currentDate && <span>DP Date - {currentDate} </span>}
            <span className="font-semibold flex items-center">
              <DownArrow
                className="rotate-[270deg] stroke-2"
                viewBox="0 0 26 26"
              />
              Parent {asin}
            </span>
          </p>
        </h2>
        {userGroups.includes("users") && (
          <div className="flex gap-5">
            <button className="btn btn-default">Save</button>
            <button className="btn btn-default">Lock Submission</button>
          </div>
        )}
      </div>
      <div className="mt-4">
        <Table
          TableData={TableData}
          // handleAccept={handleAccept}
          TableHeaderData={TableHeaderData}
          // handleReject={handleReject}
        />
      </div>

      <div className="mt-6 mb-6 [&_table]:rounded-b-lg [&_table]:rounded-t-none">
        <div className="flex items-center rounded-t-lg px-3 py-2 justify-between ring-1 ring-border-subtle">
          <div className="flex flex-1 items-center space-x-5 overflow-hidden max-w-[85%]">
            {itemsToShow.map((item) => (
              <button
                onClick={() => selectAsin(item.id)}
                key={item.id}
                className={`btn  ${
                  selectedAsin === item.id ? "bg-background-alt" : ""
                }`}
              >
                {item.id}
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

        <Table
          TableData={asinDetailsData === undefined ? [] : [asinDetailsData]}
          TableHeaderData={TableHeaderData2}
        />
        <div className="mt-4 h1">ASIN Details</div>

        {asinDetailsData === undefined
          ? []
          : [asinDetailsData]?.map((item) => (
              <div key={item.title}>{item.title}</div>
            ))}
      </div>

      {isLoadingTableauToken ? (
        <h1>Loading Tableau...</h1>
      ) : Token ? (
        <tableau-viz
          id="tableauViz"
          className={"mt-4"}
          src="https://analytics.razor-group.com/#/views/ASINReview-PurchasingDecisions/PurchasingDecisions?:iid=1"
          token={Token.token}
          toolbar="hidden"
        ></tableau-viz>
      ) : null}
    </div>
  );
}

export default SingleAsin;
