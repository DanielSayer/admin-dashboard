import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { filterFeatureToggles } from "@/server/feature-toggles";
import { getSubscribers } from "@/server/subscribers";
import { useQuery } from "@tanstack/react-query";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useState } from "react";
import { columns } from "./columns";
import { FeatureFlagsDataTable } from "./feature-flags-data-table";
import { FilterPanel, Filters } from "./filter-panel";
import { NewFeatureToggleDialog } from "./new-feature-toggle-dialog";

export function FeatureFlagsPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [filters, setFilters] = useState<Filters | undefined>();
  const [isManuallyRefetching, setIsManuallyRefetching] = useState(false);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["feature-toggles", filters],
    queryFn: () => filterFeatureToggles(filters),
  });

  const { data: subscribers, isLoading: isSubscribersLoading } = useQuery({
    queryKey: ["subscribers"],
    queryFn: getSubscribers,
  });

  const handleFilter = async (data: Filters) => {
    setFilters(data);
    setIsManuallyRefetching(true);
    await refetch();
    setIsManuallyRefetching(false);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold tracking-tight">Feature Toggles</h1>
        <div className="flex items-center gap-2">
          <NewFeatureToggleDialog />
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="justify-between"
            variant="outline"
          >
            {isOpen ? "Hide Filters" : "Show Filters"}
            <ChevronDown
              className={cn(
                "ml-2 h-4 w-4 transition-transform duration-200",
                isOpen ? "rotate-180" : "rotate-0",
              )}
            />
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <FilterPanel
              isFiltering={isManuallyRefetching}
              onSubmit={handleFilter}
            />
          </motion.div>
        )}
      </AnimatePresence>

      <FeatureFlagsDataTable
        columns={columns}
        data={data ?? []}
        subscribers={subscribers ?? []}
        isLoading={isLoading || isSubscribersLoading || isManuallyRefetching}
      />
    </div>
  );
}
