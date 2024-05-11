import * as React from "react";

import { cn } from "@/lib/utils";

const Table = React.forwardRef(({ className, ...props }, ref) => (
  <div className="relative w-full ">
    <table
      ref={ref}
      className={cn(
        "min-w-full divide-y  rounded-b-lg  h-max relative bg-white  shadow-sm ring-1 ring-border-subtle overflow-hidden whitespace-pre-wrap caption-bottom ",
        className
      )}
      {...props}
    />
  </div>
));
Table.displayName = "Table";

const TableHeader = React.forwardRef(({ className, ...props }, ref) => (
  <thead
    ref={ref}
    className={cn(
      "py-2 rounded-tl-lg rounded-tr-lg px-3  bg-background-alt border-b border-border-subtle [&_tr]:text-left [&_tr]:text-subtitle [&_tr]:capitalize [&_tr]:font-bold",
      className
    )}
    {...props}
  />
));
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef(({ className, ...props }, ref) => (
  <tbody
    ref={ref}
    className={cn(
      "[&_tr:last-child]:border-0 bg-white divide-y divide-gray-200",
      className
    )}
    {...props}
  />
));
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef(({ className, ...props }, ref) => (
  <tfoot
    ref={ref}
    className={cn(
      "border-t bg-slate-100/50 font-medium [&>tr]:last:border-b-0 dark:bg-slate-800/50",
      className
    )}
    {...props}
  />
));
TableFooter.displayName = "TableFooter";

const TableRow = React.forwardRef(({ className, ...props }, ref) => (
  <tr
    ref={ref}
    className={cn(
      "  [&_th]:   data-[state=selected]:bg-slate-100 dark:hover:bg-slate-800/50 dark:data-[state=selected]:bg-slate-800",
      className
    )}
    {...props}
  />
));
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef(({ className, ...props }, ref) => (
  <th
    ref={ref}
    className={cn(
      " px-4 py-1.5 text-left [&_button]:font-bold align-middle  [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
));
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef(({ className, ...props }, ref) => (
  <td
    ref={ref}
    className={cn(
      "p-4 align-middle px-4 py-3  whitespace-pre-wrap   [&_div]:text-subtitle [&_div]:leading-none  text-body  [&:has([role=checkbox])]:pr-0",
      className
    )}
    {...props}
  />
));
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef(({ className, ...props }, ref) => (
  <caption
    ref={ref}
    className={cn("mt-4 text-subtitle text-body", className)}
    {...props}
  />
));
TableCaption.displayName = "TableCaption";

export {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableHead,
  TableRow,
  TableCell,
  TableCaption,
};
