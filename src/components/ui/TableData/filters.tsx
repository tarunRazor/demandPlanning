import { FC } from "react";
import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableFacetedFilter } from "@/components/ui/TableData/data-table-faceted-filter";

interface FilterOption {
  value: string;
  label: string;
  icon?: React.ReactNode | string;
}
interface FilterableColumnConfig {
  column: string;
  title: string;
  searchKey?: string;
  options: FilterOption[];
}
interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  filtersConfig: FilterableColumnConfig[];
  setGlobalFilter: string;
  globalFilter: string;
  statusTitle: string;
  label: string;
}
export const DataTableToolbar: FC<DataTableToolbarProps<any>> = ({
  table,
  setGlobalFilter,
  filtersConfig,
  globalFilter,
  statusTitle,
  label,
}) => {
  const columnFilters = table.getState().columnFilters;
  const nonStatusFilters = columnFilters.filter(
    (filter) => filter.id !== statusTitle
  );
  const isFiltered = nonStatusFilters.length > 0;
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        {label && <div className="font-semibold text-subtitle">{label}</div>}
        <Input
          placeholder="Search..."
          value={globalFilter}
          onChange={(event) => setGlobalFilter(event.target.value)}
          className="h-8 w-[150px] lg:w-[250px]"
        />

        {filtersConfig?.length > 0 &&
          filtersConfig.map((filterConfig) => {
            const column = table.getColumn(filterConfig.column);
            return (
              column && (
                <DataTableFacetedFilter
                  key={filterConfig.column}
                  column={column}
                  title={filterConfig.title}
                  options={filterConfig.options}
                />
              )
            );
          })}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
    </div>
  );
};
export default DataTableToolbar;
