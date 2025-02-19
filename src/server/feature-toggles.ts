import {
  FeatureToggle,
  featureToggleDefaults,
} from "@/lib/mock-data/feature-toggles";
import { mimicServerCall } from "./lib";
import { FilterFormData } from "@/pages/dashboard/feature-toggles/filter-panel";
import { differenceInDays } from "date-fns";

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
    if (filter.subscriber && filter.subscriber !== x.name) return false;
    if (filter.description && !x.description.includes(filter.description))
      return false;
    if (filter.enabledForAll && x.enabledFor !== -1) return false;
    return true;
  });

  return filteredFeatureToggles.sort((a, b) => a.name.localeCompare(b.name));
};
