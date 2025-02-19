import { Combobox } from "@/components/ui/combobox";
import { FeatureToggle } from "@/lib/mock-data/feature-toggles";
import {
  filterFeatureToggles,
  getFeatureToggles,
} from "@/server/feature-toggles";
import { useMutation, useQuery } from "@tanstack/react-query";
import { ChevronDown, ChevronUp, Ghost } from "lucide-react";
import { useEffect, useState } from "react";
import { FeatureToggleCard } from "./feature-toggle-card";
import { getSubscribers } from "@/server/subscribers";
import { FilterFormData, FilterPanel } from "./filter-panel";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "motion/react";
import { NewFeatureToggleDialog } from "./new-feature-toggle-dialog";

export function FeatureTogglesPage() {
  const [isOpen, setIsOpen] = useState(false);
  const [featureToggles, setFeatureToggles] = useState<FeatureToggle[]>([]);
  const { data, isLoading } = useQuery({
    queryKey: ["feature-toggles"],
    queryFn: getFeatureToggles,
  });

  useEffect(() => {
    if (!data) return;

    setFeatureToggles((prev) =>
      prev.map((x) => {
        const toggle = data.find((y) => y.name === x.name);
        if (!toggle) return x;
        return toggle;
      }),
    );
  }, [data]);

  const { data: subscribers } = useQuery({
    queryKey: ["subscribers"],
    queryFn: getSubscribers,
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: filterFeatureToggles,
    onSuccess: (toggles) => {
      setFeatureToggles(toggles);
    },
  });

  const selectableFeatureToggles =
    data
      ?.filter((y) => !featureToggles.includes(y))
      .map((x) => ({ label: x.name, value: x.name })) ?? [];

  const handleSelect = (value: string) => {
    const selectedFeatureToggle = data?.find((x) => x.name === value);
    if (!selectedFeatureToggle) return;
    setFeatureToggles((prev) => [...prev, selectedFeatureToggle]);
  };

  const handleRemove = (value: string) => {
    setFeatureToggles((prev) => prev.filter((x) => x.name !== value));
  };

  const handleFilter = async (data: FilterFormData) => {
    await mutateAsync(data);
  };

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold tracking-tight">Feature Toggles</h1>
      <div className="flex items-center justify-between">
        <Combobox
          placeholder="Select a feature toggle"
          options={selectableFeatureToggles}
          onChange={handleSelect}
          isLoading={isLoading}
        />
        <div className="flex items-center gap-2">
          <NewFeatureToggleDialog />
          <Button
            onClick={() => setIsOpen(!isOpen)}
            className="justify-between"
            variant="outline"
          >
            {isOpen ? "Hide Filters" : "Show Filters"}
            {isOpen ? (
              <ChevronUp className="ml-2 h-4 w-4" />
            ) : (
              <ChevronDown className="ml-2 h-4 w-4" />
            )}
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
            <FilterPanel isFiltering={isPending} onSubmit={handleFilter} />
          </motion.div>
        )}
      </AnimatePresence>

      <div className="mt-4 flex min-h-96 flex-col gap-4 rounded-md border border-dashed p-4">
        {featureToggles.length === 0 && (
          <div className="mt-32 flex flex-col items-center justify-center gap-2 text-muted-foreground">
            <Ghost />
            <div className="">Select a feature toggle to view its details.</div>
          </div>
        )}

        {featureToggles.map((featureToggle) => (
          <FeatureToggleCard
            key={featureToggle.name}
            subscribers={subscribers ?? []}
            featureToggle={featureToggle}
            onRemove={() => handleRemove(featureToggle.name)}
          />
        ))}
      </div>
    </div>
  );
}
