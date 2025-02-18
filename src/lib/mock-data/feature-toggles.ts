type EnabledForAllSubscribers = -1;
type Module = "PocketWatch" | "Genius" | "ARM";

type FeatureToggle = {
  name: string;
  description: string;
  enabledFor: number[] | EnabledForAllSubscribers;
  creationDate: string;
  module: Module;
};

export const featureToggles: FeatureToggle[] = [
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
    creationDate: "2023-01-01",
    module: "PocketWatch",
  },
  {
    name: "EnableClientNotesMandatory",
    description:
      "When enabled, there will be a setting in Shifts to allows Roster Managers to ensure that a staff member adds notes before checking out of their shift",
    enabledFor: -1,
    creationDate: "2023-01-01",
    module: "PocketWatch",
  },
  {
    name: "genius_show_bank_details_for_hicaps_v2",
    description: "When enabled, will show the bank detail when running the OCR",
    enabledFor: [],
    creationDate: "2023-01-01",
    module: "Genius",
  },
  {
    name: "TryNewTheme",
    description:
      "Configures whether the subscriber will be using the new icons",
    enabledFor: [1, 2, 3, 4, 5, 6, 7, 8],
    creationDate: "2023-01-01",
    module: "ARM",
  },
];
