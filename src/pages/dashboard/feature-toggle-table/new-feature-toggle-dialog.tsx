import { Button } from "@/components/ui/button";
import { Combobox } from "@/components/ui/combobox";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Module, moduleList } from "@/lib/mock-data/feature-toggles";
import { registerFeatureToggle } from "@/server/feature-toggles";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

export type NewFeatureToggleFormData = {
  name: string;
  description: string;
  module: Module | undefined;
};

export function NewFeatureToggleDialog() {
  const queryClient = useQueryClient();
  const [isOpen, setIsOpen] = useState(false);
  const form = useForm<NewFeatureToggleFormData>({
    defaultValues: {
      name: "",
      description: "",
      module: undefined,
    },
  });

  const { mutateAsync, isPending } = useMutation({
    mutationFn: registerFeatureToggle,
    onSuccess: () => {
      setIsOpen(false);
      queryClient.invalidateQueries({ queryKey: ["feature-toggles"] });
      toast.success("Feature toggle registered successfully!");
      form.reset();
    },
  });

  const handleSubmit = async (data: NewFeatureToggleFormData) => {
    await mutateAsync(data);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">New Feature Toggle</Button>
      </DialogTrigger>
      <DialogContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)}>
            <DialogHeader>
              <DialogTitle>New Feature Toggle</DialogTitle>
              <DialogDescription>
                To be used by developers, once the feature toggle is implemented
                in code.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <FormField
                control={form.control}
                name="name"
                rules={{ required: "Feature Toggle Name is required" }}
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="FeatureToggleName" />
                    </FormControl>
                    <FormDescription>
                      Be sure to match this perfectly with the name in the
                      codebase. Be careful with spaces!
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                rules={{ required: "Please add a description" }}
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Search by description" />
                    </FormControl>
                    <FormDescription>
                      Add some key words on what this does.
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="module"
                rules={{ required: "Please select a module" }}
                render={({ field }) => (
                  <FormItem className="flex flex-col gap-1">
                    <FormLabel>Module</FormLabel>
                    <FormControl>
                      <Combobox
                        buttonClassName="w-full"
                        options={moduleList}
                        placeholder="Select a module"
                        value={field.value}
                        onChange={(v) =>
                          v === field.value
                            ? field.onChange(undefined)
                            : field.onChange(v)
                        }
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <DialogFooter>
              <Button
                type="button"
                onClick={() => form.reset()}
                variant="secondary"
              >
                Reset
              </Button>
              <Button type="submit" disabled={isPending}>
                {isPending ? (
                  <span className="flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Registering...
                  </span>
                ) : (
                  "Register"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
