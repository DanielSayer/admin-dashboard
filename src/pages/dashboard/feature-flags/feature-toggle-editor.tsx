import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Combobox } from "@/components/ui/combobox";
import { FeatureToggle } from "@/lib/mock-data/feature-toggles";
import { Subscriber } from "@/lib/mock-data/subscribers";
import { CheckedState } from "@radix-ui/react-checkbox";
import { Loader2, Save, Undo } from "lucide-react";
import { useState } from "react";
import { SubscriberRenderer } from "./subscriber-renderer";

type FeatureToggleEditorProps = {
  featureToggle: FeatureToggle;
  subscribers: Subscriber[];
  isSaving: boolean;
  onSave: (featureToggle: FeatureToggle) => Promise<void>;
};

export function FeatureToggleEditor({
  featureToggle,
  subscribers,
  isSaving,
  onSave,
}: FeatureToggleEditorProps) {
  const [updatedFeatureToggle, setUpdatedFeatureToggle] =
    useState<FeatureToggle>(featureToggle);

  const availableSubscribers = subscribers
    .filter((x) => {
      if (updatedFeatureToggle.enabledFor === -1) return false;
      return !updatedFeatureToggle.enabledFor.includes(x.id);
    })
    .map((x) => ({ label: x.name, value: x.id.toString() }));

  const onAddSubscriber = (value: string) => {
    setUpdatedFeatureToggle((prev) => {
      if (prev.enabledFor === -1) return prev;
      return {
        ...prev,
        enabledFor: [...prev.enabledFor, parseInt(value)],
      };
    });
  };

  const onRemoveSubscriber = (subscriberId: string) => {
    setUpdatedFeatureToggle((prev) => {
      if (prev.enabledFor === -1) return prev;
      return {
        ...prev,
        enabledFor: prev.enabledFor.filter((x) => x !== parseInt(subscriberId)),
      };
    });
  };

  const onEnableForAll = (checked: CheckedState) => {
    setUpdatedFeatureToggle((prev) => ({
      ...prev,
      enabledFor: checked ? -1 : [],
    }));
  };

  const onReset = () => {
    setUpdatedFeatureToggle(featureToggle);
  };

  return (
    <div className="grid grid-cols-4 gap-3">
      <div className="col-span-3 grid grid-cols-3 gap-3">
        <div className="space-y-2">
          <label htmlFor="add">Add</label>
          <Combobox
            id="add"
            buttonClassName="w-full"
            options={availableSubscribers}
            onChange={onAddSubscriber}
            placeholder="Add a subscriber"
          />
        </div>
        <div className="flex items-center space-x-2 px-10">
          <Checkbox
            id="all"
            onCheckedChange={onEnableForAll}
            checked={updatedFeatureToggle.enabledFor === -1}
          />
          <label
            htmlFor="all"
            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Enable for all
          </label>
        </div>

        <div className="col-span-3 flex flex-col gap-4">
          <h4 className="text-md">Result</h4>
          <SubscriberRenderer
            editing={{
              isEditing: true,
              onRemove: onRemoveSubscriber,
            }}
            toggleName={updatedFeatureToggle.name}
            enabledFor={updatedFeatureToggle.enabledFor}
            subscribers={subscribers}
          />
        </div>
      </div>
      <div className="flex flex-col justify-end">
        <div className="flex w-full justify-end gap-4">
          <Button variant="secondary" onClick={onReset}>
            <Undo className="mr-2 h-4 w-4" />
            Reset
          </Button>
          <Button
            size="default"
            onClick={() => onSave(updatedFeatureToggle)}
            disabled={isSaving}
          >
            {isSaving ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <Save className="mr-2 h-4 w-4" />
            )}
            Save
          </Button>
        </div>
      </div>
    </div>
  );
}
