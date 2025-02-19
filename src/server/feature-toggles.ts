import {
  FeatureToggle,
  featureToggleDefaults,
} from "@/lib/mock-data/feature-toggles";
import { mimicServerCall } from "./lib";
import { FilterFormData } from "@/pages/dashboard/feature-toggles/filter-panel";
import { differenceInDays, format } from "date-fns";
import { NewFeatureToggleFormData } from "@/pages/dashboard/feature-toggles/new-feature-toggle-dialog";

export const getFeatureToggles = async (): Promise<FeatureToggle[]> => {
  await mimicServerCall();
  const savedFeatureToggles = localStorage.getItem("featureToggles");

  if (savedFeatureToggles) {
    const parsedFeatureToggles = JSON.parse(
      savedFeatureToggles,
    ) as FeatureToggle[];
    return parsedFeatureToggles.sort((a, b) => a.name.localeCompare(b.name));
  }

  localStorage.setItem("featureToggles", JSON.stringify(featureToggleDefaults));
  return featureToggleDefaults.sort((a, b) => a.name.localeCompare(b.name));
};

export const saveFeatureToggle = async (featureToggle: FeatureToggle) => {
  await mimicServerCall();
  const savedFeatureToggles = localStorage.getItem("featureToggles");
  if (!savedFeatureToggles) return;

  const parsedFeatureToggles = JSON.parse(
    savedFeatureToggles,
  ) as FeatureToggle[];

  const featureToggleToUpdate = parsedFeatureToggles?.find(
    (x) => x.name === featureToggle.name,
  );

  if (featureToggleToUpdate) {
    parsedFeatureToggles.splice(
      parsedFeatureToggles.indexOf(featureToggleToUpdate),
      1,
      featureToggle,
    );
    localStorage.setItem(
      "featureToggles",
      JSON.stringify(parsedFeatureToggles),
    );
    return;
  }
};

export const filterFeatureToggles = async (
  filter: FilterFormData,
): Promise<FeatureToggle[]> => {
  await mimicServerCall();
  const savedFeatureToggles = localStorage.getItem("featureToggles");
  if (!savedFeatureToggles) return [];

  const parsedFeatureToggles = JSON.parse(
    savedFeatureToggles,
  ) as FeatureToggle[];

  const filteredFeatureToggles = parsedFeatureToggles.filter((x) => {
    const filterExistanceTime = differenceInDays(
      new Date(),
      new Date(x.creationDate),
    );
    if (
      filter.existedLongerThan &&
      filterExistanceTime < parseInt(filter.existedLongerThan)
    )
      return false;
    if (filter.module && filter.module !== x.module) return false;
    if (filter.subscriber) {
      if (
        x.enabledFor !== -1 &&
        !x.enabledFor.includes(parseInt(filter.subscriber))
      ) {
        return false;
      }
    }
    if (filter.description && !x.description.includes(filter.description))
      return false;
    if (filter.enabledForAll && x.enabledFor !== -1) return false;
    return true;
  });

  return filteredFeatureToggles.sort((a, b) => a.name.localeCompare(b.name));
};

export const registerFeatureToggle = async (
  featureToggle: NewFeatureToggleFormData,
) => {
  const featureToggles = await getFeatureToggles();
  if (!featureToggle.module) {
    throw new Error("Module is required");
  }

  const newFeatureToggle: FeatureToggle = {
    name: featureToggle.name,
    description: featureToggle.description,
    module: featureToggle.module,
    enabledFor: [] as number[],
    creationDate: format(new Date(), "yyyy-MM-dd"),
  };

  featureToggles.push(newFeatureToggle);
  localStorage.setItem("featureToggles", JSON.stringify(featureToggles));
};
