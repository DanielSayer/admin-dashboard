import { Combobox } from "@/components/ui/combobox";
import { FeatureToggle } from "@/lib/mock-data/feature-toggles";
import { getFeatureToggles } from "@/server/feature-toggles";
import { useQuery } from "@tanstack/react-query";
import { Ghost } from "lucide-react";
import { useState } from "react";
import { FeatureToggleCard } from "./feature-toggle-card";
import { getSubscribers } from "@/server/subscribers";

export function FeatureTogglesPage() {
  const { data, isLoading } = useQuery({
    queryKey: ["feature-toggles"],
    queryFn: getFeatureToggles,
  });

  const { data: subscribers } = useQuery({
    queryKey: ["subscribers"],
    queryFn: getSubscribers,
  });

  const [featureToggles, setFeatureToggles] = useState<FeatureToggle[]>([]);

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

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-2xl font-bold tracking-tight">Feature Toggles</h1>

      <Combobox
        placeholder="Select a feature toggle"
        options={selectableFeatureToggles}
        onChange={handleSelect}
        isLoading={isLoading}
      />

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
