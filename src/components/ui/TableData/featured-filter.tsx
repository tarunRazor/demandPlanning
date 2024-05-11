"use client";
import React from "react";
import { Button } from "@/components/ui/button";

function FeaturedFilter({ table, filtersConfig, title }) {
  const [activeBtn, setActiveBtn] = React.useState(null);
  const HandleReset = () => {
    table.resetColumnFilters();
    setActiveBtn(null);
  };

  const HandleFilter = (label) => {
    table.getColumn(title).setFilterValue(label);

    setActiveBtn(label);
  };

  return (
    <div className="flex items-center rounded-t-lg px-3 py-2 justify-between ring-1 ring-border-subtle">
      <div className="flex flex-1 items-center space-x-2">
        <Button
          key={"all"}
          variant="active"
          onClick={() => HandleReset()}
          className={`h-8 px-2 lg:px-3 ${
            activeBtn === null && "bg-background-alt"
          }`}
        >
          All
        </Button>
        {filtersConfig
          ?.filter(
            (filterConfig) => filterConfig !== null && filterConfig.label
          )
          .map((filterConfig, index) => {
            return (
              table.getColumn(title) && (
                <Button
                  key={filterConfig.label}
                  variant="ghost"
                  onClick={() => HandleFilter(filterConfig.label)}
                  className={`h-8 px-2 lg:px-3 capitalize ${
                    activeBtn === filterConfig.label ? "bg-background-alt" : ""
                  }`}
                >
                  {filterConfig.label.toLowerCase().replace("_", " ")}
                </Button>
              )
            );
          })}
      </div>
    </div>
  );
}
export default FeaturedFilter;
