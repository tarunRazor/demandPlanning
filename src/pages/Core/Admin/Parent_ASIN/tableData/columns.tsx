import { ColumnDef } from "@tanstack/react-table";
import StatusBadge from "@/components/common/StatusBadge";
import { Checkbox } from "@/components/ui/checkbox";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { AppContext } from "@/contexts/AppContext";
import { DataTableColumnHeader } from "@/components/ui/TableData/data-table-column-header";
import { DataTableRowActions } from "@/components/ui/TableData/data-table-row-actions";
import { useContext } from "react";

export type Task = {
  id: string | number;
  title: string;
  status: string;
  label: string;
  priority: string;
};

//const statuses = Filterdata.find((f) => f.column === 'status')?.options || [];

export const columns = ({ data, navigate, currentDate }) => {
  const { userGroups } = useContext(AppContext);
  console.log("userGroups", userGroups);
  const AssignedData =
    data.find((f) => f.column === "Assigned_to")?.options || [];
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
      accessorKey: "Parent_ASIN",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Parent ASIN " />
      ),
      enableHiding: false,
      enableSorting: false,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[100px] truncate font-medium">
              {row.getValue("Parent_ASIN")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "MP",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="M P" />
      ),
      enableHiding: false,
      enableSorting: false,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="min-w-[40px] max-w-[100px] truncate font-medium">
              {row.getValue("MP")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "Suggested_Qty_next_12_M",
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
            <span className="max-w-[100px] truncate font-medium">
              {row.getValue("Suggested_Qty_next_12_M")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "Final_Qty_next_12_M",
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
            <span className="min-w-[60px] truncate font-medium">
              {row.getValue("Final_Qty_next_12_M")}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "Delta",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Delta" />
      ),
      cell: ({ row }) => {
        const delta = DeltaData.find(
          (DeltaData) => DeltaData.value === row.getValue("Delta")
        );
        if (!delta) {
          return null;
        }
        return (
          <div
            className={`flex  items-center ${
              delta.value.includes("-")
                ? "text-warning"
                : delta.value.includes("+")
                ? "text-success"
                : ""
            }`}
          >
            {delta.value}
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
      accessorKey: "Assigned_to",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Assigned to" />
      ),
      cell: ({ row }) => {
        const assigned = AssignedData.find(
          (AssignedData) => AssignedData.value === row.getValue("Assigned_to")
        );
        if (!assigned) {
          return null;
        }
        return (
          <div className="flex min-w-[90px] items-center">{assigned.value}</div>
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
        <DataTableColumnHeader column={column} title="Last Updated" />
      ),
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="min-w-[50px] truncate font-medium">
              {row.getValue("Last_Updated")}
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
    //         <span className="max-w-[500px] truncate font-medium">
    //           {row.getValue("Invoice_Amount")}
    //         </span>
    //       </div>
    //     );
    //   },
    // },

    {
      accessorKey: "Status",
      enableSorting: false,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = row.getValue("Status");
        return (
          status != null && (
            <div className="flex  items-center capitalize">
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
            <span className="min-w-[100px]  font-medium">
              <button className="btn btn-default">
                {userGroups.includes("admin") ? (
                  <Link
                    to={`/core/asin/${currentDate}/${row.getValue(
                      "Parent_ASIN"
                    )}`}
                  >
                    View Plan
                  </Link>
                ) : userGroups.includes("users") ? (
                  <Link to={`/user/asin/${row.getValue("Parent_ASIN")}`}>
                    Edit Plan
                  </Link>
                ) : null}
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
