import React from "react";
import { Skeleton } from "@/components/ui/skeleton";
function TableSkeleton() {
  return (
    <div>
      {" "}
      <>
        <h1 className="text-title font-bold mb-2 mt-5">
          <Skeleton className="w-[100px] h-[20px] rounded-md" />
        </h1>

        <h2 className=" flex gap-5">
          <Skeleton className="w-[200px] h-[20px] rounded-md" />
        </h2>
        <div className="flex gap-5 mt-4">
          <Skeleton className="w-[300px] h-[20px] rounded-md" />
          <Skeleton className="w-[100px] h-[20px] rounded-md" />
        </div>

        <div className="flex mt-3 items-center rounded-t-lg px-3 py-2 gap-5 ring-1 ring-gray-100">
          {Array.from({ length: 4 }, (_, index) => (
            <div className="p-2" key={index}>
              <Skeleton key={index} className="w-[100px] h-[20px] rounded-md" />
            </div>
          ))}
        </div>
        <div className="min-w-full divide-y rounded-b-lg   relative  shadow-sm ring-1 ring-gray-100 whitespace-nowrap caption-bottom ">
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

        <h2 className=" flex gap-5"></h2>
      </>
    </div>
  );
}

export default TableSkeleton;
