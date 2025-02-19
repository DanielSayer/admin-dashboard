import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { FeatureToggle } from "@/lib/mock-data/feature-toggles";
import { Subscriber } from "@/lib/mock-data/subscribers";
import { differenceInDays, format } from "date-fns";
import { Pencil, X } from "lucide-react";
import { SubscriberRenderer } from "./subscriber-renderer";
import { useState } from "react";
import { FeatureToggleEditor } from "./feature-toggle-editor";
import { saveFeatureToggle } from "@/server/feature-toggles";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

type FeatureToggleCardProps = {
  featureToggle: FeatureToggle;
  subscribers: Subscriber[];
  onRemove: () => void;
};

export function FeatureToggleCard({
  featureToggle,
  subscribers,
  onRemove,
}: FeatureToggleCardProps) {
  const queryClient = useQueryClient();
  const [isEditing, setIsEditing] = useState(false);

  const { isPending, mutateAsync } = useMutation({
    mutationFn: saveFeatureToggle,
    onSuccess: () => {
      setIsEditing(false);
      queryClient.invalidateQueries({ queryKey: ["feature-toggles"] });
      toast.success("Feature toggle updated successfully!");
    },
  });

  return (
    <Card>
      <CardHeader>
        <div className="flex w-full justify-between">
          <div>
            <CardTitle className="text-lg font-medium">
              {featureToggle.name}
            </CardTitle>
            <CardDescription>
              {featureToggle.module} - {featureToggle.description}
            </CardDescription>
          </div>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Remove"
            onClick={onRemove}
          >
            <X className="h-4 w-4 text-muted-foreground" />
          </Button>
        </div>
        <Separator />
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <FeatureToggleEditor
            featureToggle={featureToggle}
            subscribers={subscribers}
            isSaving={isPending}
            onSave={mutateAsync}
          />
        ) : (
          <FeatureToggleCardViewer
            featureToggle={featureToggle}
            subscribers={subscribers}
            handleEdit={() => setIsEditing(true)}
          />
        )}
      </CardContent>
    </Card>
  );
}

type FeatureToggleCardViewerProps = {
  featureToggle: FeatureToggle;
  subscribers: Subscriber[];
  handleEdit: () => void;
};

const FeatureToggleCardViewer = ({
  featureToggle,
  subscribers,
  handleEdit,
}: FeatureToggleCardViewerProps) => {
  return (
    <div className="grid grid-cols-4 gap-3">
      <div className="col-span-3 flex flex-col gap-4">
        <h4 className="text-md">Current Subscribers</h4>
        <SubscriberRenderer
          enabledFor={featureToggle.enabledFor}
          subscribers={subscribers}
        />
      </div>
      <div className="flex flex-col justify-between">
        <h4 className="text-md">
          Created: {format(featureToggle.creationDate, "dd MMM yyyy")} (
          {differenceInDays(new Date(), new Date(featureToggle.creationDate))}{" "}
          days ago)
        </h4>
        <div className="flex justify-end">
          <Button size="default" onClick={handleEdit}>
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </Button>
        </div>
      </div>
    </div>
  );
};
