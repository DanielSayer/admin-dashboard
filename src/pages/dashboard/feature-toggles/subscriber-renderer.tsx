import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { FeatureToggleSubscriberList } from "@/lib/mock-data/feature-toggles";
import { Subscriber } from "@/lib/mock-data/subscribers";
import { Ghost, PartyPopper, X } from "lucide-react";

type SubscriberCountRendererProps = {
  toggleName: string;
  enabledFor: FeatureToggleSubscriberList;
  subscribers: Subscriber[];
  editing?: {
    isEditing: boolean;
    onRemove: (subscriberId: string) => void;
  };
};

export function SubscriberRenderer({
  toggleName,
  enabledFor,
  subscribers,
  editing,
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
        <Badge
          key={`${toggleName}-${subscriberId}`}
          className="justify-between"
        >
          {subscribers.find((x) => x.id === subscriberId)?.name}
          {editing?.isEditing && (
            <Button
              onClick={() => editing.onRemove(subscriberId.toString())}
              size="icon"
              variant="ghost"
              aria-label="Remove subscriber"
              type="button"
              className="h-4 w-4 hover:bg-destructive/50"
            >
              <X className="h-2 w-2 text-destructive" />
            </Button>
          )}
        </Badge>
      ))}
    </div>
  );
}
