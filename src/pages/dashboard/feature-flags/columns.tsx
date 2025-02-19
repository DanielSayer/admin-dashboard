import { Button } from "@/components/ui/button";
import { DataTableColumnHeader } from "@/components/ui/data-table-column-header";
import {
  FeatureToggle,
  FeatureToggleSubscriberList,
} from "@/lib/mock-data/feature-toggles";
import { cn } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { differenceInDays } from "date-fns";
import { ChevronDown } from "lucide-react";

export const columns: ColumnDef<FeatureToggle>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Name" />;
    },
    cell: ({ getValue }) => {
      const value = getValue() as string;

      return <div className="truncate">{value}</div>;
    },
    sortingFn: "alphanumeric",
    size: 25,
  },
  {
    accessorKey: "description",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Description" />;
    },
    cell: ({ getValue }) => {
      const value = getValue() as string;

      return <div className="line-clamp-3">{value}</div>;
    },
    size: 40,
  },
  {
    accessorKey: "enabledFor",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Enabled For" />;
    },
    cell: ({ getValue }) => {
      const value = getValue<FeatureToggleSubscriberList>();

      if (value === -1) {
        return "All clients";
      }

      return `${value.length} clients`;
    },
    size: 10,
  },
  {
    accessorKey: "module",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Module" />;
    },
    size: 10,
  },
  {
    accessorKey: "creationDate",
    header: ({ column }) => {
      return <DataTableColumnHeader column={column} title="Life Length" />;
    },
    cell: ({ getValue }) => {
      const value = getValue<string>();
      const lifeLength = differenceInDays(new Date(), new Date(value));
      return `${lifeLength} days`;
    },
    size: 10,
  },
  {
    id: "expander",
    cell: ({ row }) => {
      return row.getCanExpand() ? (
        <Button
          variant="ghost"
          size="icon"
          onClick={row.getToggleExpandedHandler()}
        >
          <ChevronDown
            className={cn(
              "transition-transform duration-200",
              row.getIsExpanded() ? "rotate-180" : "rotate-0",
            )}
          />
        </Button>
      ) : null;
    },
    size: 5,
  },
];
