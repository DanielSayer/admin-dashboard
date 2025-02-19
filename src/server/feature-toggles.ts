import {
  FeatureToggle,
  featureToggleDefaults,
} from "@/lib/mock-data/feature-toggles";
import { mimicServerCall } from "./lib";

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
