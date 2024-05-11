import { ColumnDef } from "@tanstack/react-table";
import StatusBadge from "@/components/common/StatusBadge";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate, Link } from "react-router-dom";
import { DataTableColumnHeader } from "@/components/ui/TableData/data-table-column-header";
import { DataTableRowActions } from "@/components/ui/TableData/data-table-row-actions";
import useDateFormat from "@/Hooks/useDateFormat";
export type Task = {
  id: string | number;
  title: string;
  status: string;
  label: string;
  priority: string;
};

//const statuses = Filterdata.find((f) => f.column === 'status')?.options || [];

export const columns = ({ data, navigate }) => {
  // const Assigned_to =
  //   data.find((f) => f.column === "Assigned_to")?.options || [];

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
      accessorKey: "demand_plan_upload_timestamp",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="DP Date" />
      ),
      enableHiding: false,
      enableSorting: false,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="leading-5  font-medium">
              {useDateFormat(row.getValue("demand_plan_upload_timestamp"))}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "total_asins",
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader
          className="text-center"
          column={column}
          title="Total Items"
        />
      ),
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div className=" space-x-2 text-center">
            <span className=" truncate font-medium ">
              {row.getValue("total_asins")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "completed_asins",
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader
          className="text-center"
          column={column}
          title="Items reviewed"
        />
      ),
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div className="text-center space-x-2">
            <span className=" truncate font-medium">
              {row.getValue("completed_asins")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "items_pending",
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader
          className="text-center"
          column={column}
          title="Items Pending"
        />
      ),
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div className="text-center space-x-2">
            <span className=" truncate font-medium">
              {}
              {row.getValue("total_asins") - row.getValue("completed_asins")}
            </span>
          </div>
        );
      },
    },

    // {
    //   accessorKey: "Assigned_to",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="Assigned to" />
    //   ),
    //   cell: ({ row }) => {
    //     const assigned = Assigned_to.find(
    //       (Assigned_to) => Assigned_to.value === row.getValue("Assigned_to")
    //     );
    //     if (!assigned) {
    //       return null;
    //     }
    //     return (
    //       <div className="flex w-[100px] items-center">{assigned.value}</div>
    //     );
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
    //         <span className=" truncate font-medium">
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
          title="Submission Status"
        />
      ),
      cell: ({ row }) => {
        const status = row.getValue("status");
        return (
          status != null && (
            <div className="text-center items-center capitalize">
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
      accessorKey: "Action",
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
          <div className="whitespace-nowrap space-x-2">
            <span className="min-w-[100px] flex justify-center font-medium">
              <button className="btn btn-default" onClick={() => navigate("/")}>
                Lock Submission
              </button>
              <button className="btn btn-link">
                <Link
                  to={`/core/user/parentAsin/${row.getValue(
                    "demand_plan_upload_timestamp"
                  )}`}
                >
                  View
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
