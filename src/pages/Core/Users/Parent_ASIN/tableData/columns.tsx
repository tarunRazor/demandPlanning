import StatusBadge from "@/components/common/StatusBadge";

import { Link } from "react-router-dom";

import { DataTableColumnHeader } from "@/components/ui/TableData/data-table-column-header";

import useDateFormat from "@/Hooks/useDateFormat";

export type Task = {
  id: string | number;
  title: string;
  status: string;
  label: string;
  priority: string;
};

//const statuses = Filterdata.find((f) => f.column === 'status')?.options || [];

export const columns = ({ data, navigate, demand_plan_upload_timestamp }) => {
  const DeltaData = data.find((f) => f.column === "Delta")?.options || [];

  return [
    // {
    //   id: 'select',
    //   header: ({ table }) => (
    //     <Checkbox
    //       checked={
    //         table.getIsAllPageRowsSelected() || (table.getIsSomePageRowsSelected() && 'indeterminate')
    //       }
    //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
    //       aria-label="Select all"
    //       className="translate-y-[2px]"
    //     />
    //   ),
    //   cell: ({ row }) => (
    //     <Checkbox
    //       checked={row.getIsSelected()}
    //       onCheckedChange={(value) => row.toggleSelected(!!value)}
    //       aria-label="Select row"
    //       className="translate-y-[2px]"
    //     />
    //   ),
    //   enableSorting: false,
    //   enableHiding: false,
    // },
    {
      accessorKey: "parent_asin",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Parent ASIN " />
      ),
      enableHiding: false,
      enableSorting: false,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[100px]  font-medium">
              {row.getValue("parent_asin")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "marketplace",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="M P" />
      ),
      enableHiding: false,
      enableSorting: false,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="  font-medium">{row.getValue("marketplace")}</span>
          </div>
        );
      },
    },
    {
      accessorKey: "suggested_quantity",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Suggested Qty 
(next 12 M)"
        />
      ),
      enableHiding: false,
      enableSorting: false,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className=" font-medium">
              {row.getValue("suggested_quantity")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "final_quantity",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Final Qty 
(next 12 M)"
        />
      ),
      enableHiding: false,
      enableSorting: false,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className=" font-medium">
              {row.getValue("final_quantity")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "Delta",
      header: ({ column }) => (
        <DataTableColumnHeader
          className="text-center"
          column={column}
          title="Delta"
        />
      ),
      cell: ({ row }) => {
        // const delta = DeltaData.find(
        //   (DeltaData) => DeltaData.value === row.getValue("Delta")
        // );

        // if (!delta) {
        //   return null;
        // }
        return (
          <div className="flex justify-center items-center">
            {((row.getValue("final_quantity") -
              row.getValue("suggested_quantity")) /
              row.getValue("suggested_quantity")) *
              100 +
              "%"}
          </div>
          // <div
          //   className={`flex  items-center ${
          //     delta.value.includes("-")
          //       ? "text-warning"
          //       : delta.value.includes("+")
          //       ? "text-success"
          //       : ""
          //   }`}
          // >
          //   {delta.value}
          // </div>
        );
      },
      enableSorting: false,
      enableHiding: false,

      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "demand_plan_upload_timestamp",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="DP date" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex min-w-[90px] items-center">
            {}
            {useDateFormat(row.getValue("demand_plan_upload_timestamp"))}
          </div>
        );
      },
      enableSorting: false,
      enableHiding: false,

      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },
    {
      accessorKey: "Last_Updated",
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader
          className="text-center"
          column={column}
          title="Last Updated"
        />
      ),
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div className="flex justify-center space-x-2">
            <span className="leading-5 font-medium">
              {/* {useDateFormat(row.getValue("demand_plan_upload_timestamp"))} */}
              {"-"}
            </span>
          </div>
        );
      },
    },
    // {
    //   accessorKey: 'po_number',
    //   header: ({ column }) => <DataTableColumnHeader column={column} title="PO No." />,
    //   cell: ({ row }) => {
    //     const po = Pos.find((pos) => pos.value === row.getValue('po_number'));
    //     if (!po) {
    //       return null;
    //     }
    //     return <div className="flex w-[100px] items-center">{po.value}</div>;
    //   },
    //   enableSorting: true,
    //   enableHiding: false,

    //   filterFn: (row, id, value) => {
    //     return value.includes(row.getValue(id));
    //   },
    // },

    // {
    //   accessorKey: "Invoice_Amount",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="Invoice Amount" />
    //   ),
    //   enableHiding: false,
    //   cell: ({ row }) => {
    //     return (
    //       <div className="flex space-x-2">
    //         <span className="max-w-[500px]  font-medium">
    //           {row.getValue("Invoice_Amount")}
    //         </span>
    //       </div>
    //     );
    //   },
    // },

    {
      accessorKey: "status",
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader
          className="text-center"
          column={column}
          title="Status"
        />
      ),
      cell: ({ row }) => {
        const status = row.getValue("status");
        return (
          status != null && (
            <div className="flex justify-center items-center capitalize">
              <StatusBadge status={status} />
            </div>
          )
        );
      },
      filterFn: (row, id, value) => {
        return value.includes(row.getValue(id));
      },
    },

    {
      accessorKey: "asins",
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader
          className="text-center"
          column={column}
          title="Action"
        />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex justify-center space-x-2">
            <span className="min-w-[100px]  font-medium">
              <button className="btn btn-default">
                <Link
                  state={{ asins: row.getValue("asins") }}
                  to={`/core/user/asin/${demand_plan_upload_timestamp}/${row.getValue(
                    "parent_asin"
                  )}/${row.getValue("marketplace")}`}
                >
                  Edit Plan
                </Link>
              </button>
            </span>
          </div>
        );
      },
    },
    // {
    //   id: "actions",
    //   // cell: ({ row }) => <DataTableRowActions row={row} />,
    // },
  ];
};
