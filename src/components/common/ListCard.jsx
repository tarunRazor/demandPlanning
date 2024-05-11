import React from "react";
import LineSeparator from "../../assets/icons/LineSeparator";
import FilterDropdown from "./FilterDropdown";
import { useState } from "react";
function ListCard({ items, filterKey, defaultFilterValue  }) {
  const [selectedFilter, setSelectedFilter] = useState(defaultFilterValue);

  const uniqueFilters = (items) => {
    const filterValues = items.map((item) => item[filterKey]);
    return [...new Set(filterValues)];
  };

  const filteredItems =
    selectedFilter === defaultFilterValue
      ? items
      : items.filter((item) => item[filterKey] === selectedFilter);

  return (
    <div className=" rounded-lg    h-max relative bg-white  shadow-sm ring-1 ring-border-subtle lg:grid-cols-2 ">
      <div className="py-2 rounded-tl-lg rounded-tr-lg px-3 items-center flex justify-between bg-background-alt border-b border-border-subtle">
        <div className="flex flex-col text-sm font-semibold w-auto">
          Recently Viewed
        </div>
        <div className="flex w-6/12">
          <FilterDropdown
            selectedFilter={selectedFilter}
            setSelectedFilter={setSelectedFilter}
            listValue={uniqueFilters}
            items={items}
            defaultFilterValue={defaultFilterValue}
          />
        </div>
      </div>
      {filteredItems.map((item) => {
        return (
          <div key={item.title} className="px-2 mt-1 mb-1 cursor-pointer">
            <div
              className={`flex rounded-md px-2 py-2 hover:bg-background-alt items-center hover:underline :group-hover-decoration-1  ${
                item.type === "recentlyViewed" ? "" : "justify-between"
              }`}
            >
              <p className="text-subtitle">{item.title}</p>
              {item.type === "recentlyViewed" && (
                <span className="px-2">
                  <LineSeparator />
                </span>
              )}

              <p
                className={` ${
                  item.type === "recentlyViewed"
                    ? "text-primary"
                    : "text-heading"
                } `}
              >
                {item.subTitle.includes("days")
                  ? item.subTitle.replace("days", "d")
                  : item.subTitle}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ListCard;
