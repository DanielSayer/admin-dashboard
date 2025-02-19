import { Badge } from "@/components/ui/badge";
import { FeatureToggleSubscriberList } from "@/lib/mock-data/feature-toggles";
import { Subscriber } from "@/lib/mock-data/subscribers";
import { Ghost, PartyPopper } from "lucide-react";

type SubscriberCountRendererProps = {
  toggleName: string;
  enabledFor: FeatureToggleSubscriberList;
  subscribers: Subscriber[];
};

export function SubscriberRenderer({
  toggleName,
  enabledFor,
  subscribers,
}: SubscriberCountRendererProps) {
  if (enabledFor === -1) {
    return (
      <div className="grid w-full place-items-center rounded border p-4">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <PartyPopper className="h-6 w-6" />
          <h5>Enabled for all subscribers!</h5>
        </div>
      </div>
    );
  }

  if (enabledFor.length === 0) {
    return (
      <div className="grid w-full place-items-center rounded border p-4">
        <div className="flex flex-col items-center gap-2 text-muted-foreground">
          <Ghost className="h-6 w-6" />
          <h5>Not enabled!</h5>
        </div>
      </div>
    );
  }

  return (
    <div className="grid max-h-48 w-full grid-cols-3 gap-2 rounded border p-4">
      {enabledFor.map((subscriberId) => (
        <div key={`${toggleName}-${subscriberId}`}>
          <Badge>{subscribers.find((x) => x.id === subscriberId)?.name}</Badge>
        </div>
      ))}
    </div>
  );
}
