import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  getExpandedRowModel,
  getSortedRowModel,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Fragment, useState } from "react";
import { FeatureToggleCard } from "./feature-toggle-card";
import { Subscriber } from "@/lib/mock-data/subscribers";
import { Skeleton } from "@/components/ui/skeleton";
import { FeatureToggle } from "@/lib/mock-data/feature-toggles";
import { AnimatePresence, motion } from "motion/react";

interface DataTableProps<TValue> {
  columns: ColumnDef<FeatureToggle, TValue>[];
  data: FeatureToggle[];
  subscribers: Subscriber[];
  isLoading: boolean;
}

export function FeatureFlagsDataTable<TValue>({
  columns,
  data,
  subscribers,
  isLoading,
}: DataTableProps<TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    defaultColumn: {
      minSize: 5,
    },
    getRowCanExpand: () => true,
    getCoreRowModel: getCoreRowModel(),
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    getExpandedRowModel: getExpandedRowModel(),
    state: {
      sorting,
    },
  });

  return (
    <div className="rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead
                    key={header.id}
                    style={{ width: `${header.getSize()}%` }}
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {isLoading ? (
            <>
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <Skeleton className="w-100 h-10" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <Skeleton className="w-100 h-10" />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell colSpan={columns.length}>
                  <Skeleton className="w-100 h-10" />
                </TableCell>
              </TableRow>
            </>
          ) : table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <Fragment key={row.id}>
                <TableRow data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
                <AnimatePresence>
                  {row.getIsExpanded() && (
                    <TableRow className="hover:bg-transparent">
                      <TableCell
                        colSpan={row.getVisibleCells().length}
                        className="p-2"
                      >
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: "auto", opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3, ease: "easeInOut" }}
                          className="overflow-hidden"
                        >
                          <FeatureToggleCard
                            subscribers={subscribers}
                            featureToggle={row.original}
                          />
                        </motion.div>
                      </TableCell>
                    </TableRow>
                  )}
                </AnimatePresence>
              </Fragment>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}
