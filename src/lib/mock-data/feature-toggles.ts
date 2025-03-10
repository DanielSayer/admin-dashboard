type EnabledForAllSubscribers = -1;

const modules = ["PocketWatch", "Genius", "ARM"] as const;
export const moduleList = modules.map((x) => ({ label: x, value: x }));

export type Module = (typeof modules)[number];

export type FeatureToggleSubscriberList = number[] | EnabledForAllSubscribers;

export type FeatureToggle = {
  name: string;
  description: string;
  enabledFor: FeatureToggleSubscriberList;
  creationDate: string;
  module: Module;
};

export const featureToggleDefaults: FeatureToggle[] = [
  {
    name: "PW_ReportsHub",
    description:
      "Enables sending reports to the reports hub for download, rather than emailing them",
    enabledFor: [1, 2, 3],
    creationDate: "2023-01-01",
    module: "PocketWatch",
  },
  {
    name: "TransportSummaryPanel",
    description: "Shows the transport summary panel in Check in/out page",
    enabledFor: [1],
    creationDate: "2024-10-10",
    module: "PocketWatch",
  },
  {
    name: "EnableClientNotesMandatory",
    description:
      "When enabled, there will be a setting in Shifts to allows Roster Managers to ensure that a staff member adds notes before checking out of their shift",
    enabledFor: -1,
    creationDate: "2025-02-18",
    module: "PocketWatch",
  },
  {
    name: "genius_show_bank_details_for_hicaps_v2",
    description: "When enabled, will show the bank detail when running the OCR",
    enabledFor: [],
    creationDate: "2021-01-01",
    module: "Genius",
  },
  {
    name: "TryNewTheme",
    description:
      "Configures whether the subscriber will be using the new icons",
    enabledFor: [1, 2, 3, 4, 5, 6, 7, 8],
    creationDate: "2024-10-01",
    module: "ARM",
  },
];
