import { ColumnDef } from "@tanstack/react-table";
import StatusBadge from "@/components/common/StatusBadge";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate, Link } from "react-router-dom";
import { DataTableColumnHeader } from "@/components/ui/TableData/data-table-column-header";
import { DataTableRowActions } from "@/components/ui/TableData/data-table-row-actions";

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
      accessorKey: "DP_Date",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="DP Date" />
      ),
      enableHiding: false,
      enableSorting: false,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("DP_Date")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "of_ASIN_x_MP",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="# of ASIN x MP" />
      ),
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("of_ASIN_x_MP")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "Items_reviewed",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Items reviewed" />
      ),
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("Items_reviewed")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "Items_Pending",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Items Pending" />
      ),
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px] truncate font-medium">
              {row.getValue("Items_Pending")}
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
    //         <span className="max-w-[500px] truncate font-medium">
    //           {row.getValue("Invoice_Amount")}
    //         </span>
    //       </div>
    //     );
    //   },
    // },

    {
      accessorKey: "Submission_Status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Submission Status" />
      ),
      cell: ({ row }) => {
        const status = row.getValue("Submission_Status");
        return (
          status != null && (
            <div className="flex w-[100px] items-center capitalize">
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
        <DataTableColumnHeader column={column} title="Action" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[500px]  font-medium">
              <button className="btn btn-default" onClick={() => navigate("/")}>
                Approve
              </button>
              <button className="btn btn-link">
                <Link to={`/core/parentAsin/${row.getValue("DP_Date")}`}>
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
