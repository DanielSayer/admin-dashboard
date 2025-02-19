import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Combobox } from "@/components/ui/combobox";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { moduleList } from "@/lib/mock-data/feature-toggles";
import { getSubscribers } from "@/server/subscribers";
import { useQuery } from "@tanstack/react-query";
import { Loader2 } from "lucide-react";
import { useForm } from "react-hook-form";

export type FilterFormData = {
  module?: string;
  subscriber?: string;
  description?: string;
  existedLongerThan?: string;
  enabledForAll?: boolean;
};

type FilterPanelProps = {
  isFiltering: boolean;
  onSubmit: (data: FilterFormData) => Promise<void>;
};

export const FilterPanel = ({ isFiltering, onSubmit }: FilterPanelProps) => {
  const form = useForm();
  const { data: subscribers, isLoading } = useQuery({
    queryKey: ["subscribers"],
    queryFn: getSubscribers,
  });

  const handleSubmit = (data: FilterFormData) => {
    onSubmit(data);
  };

  return (
    <Card>
      <CardHeader className="py-3">
        <CardTitle className="text-lg font-medium">Filters</CardTitle>
      </CardHeader>
      <CardContent className="py-3">
        <Form {...form}>
          <form
            className="grid grid-cols-3 gap-6"
            onSubmit={form.handleSubmit(handleSubmit)}
          >
            <FormField
              control={form.control}
              name="module"
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
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subscriber"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel>Subscriber</FormLabel>
                  <FormControl>
                    <Combobox
                      buttonClassName="w-full"
                      options={
                        subscribers?.map((x) => ({
                          label: x.name,
                          value: x.id.toString(),
                        })) ?? []
                      }
                      isLoading={isLoading}
                      placeholder="Select a subscriber"
                      value={field.value}
                      onChange={(v) =>
                        v === field.value
                          ? field.onChange(undefined)
                          : field.onChange(v)
                      }
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Search by description" />
                  </FormControl>
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="existedLongerThan"
              render={({ field }) => (
                <FormItem className="flex flex-col gap-1">
                  <FormLabel>Existed Longer Than</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Enter min number of days"
                      type="number"
                      min={0}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="enabledForAll"
              render={({ field }) => (
                <FormItem className="flex items-center space-x-3 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <div className="space-y-1 leading-none">
                    <FormLabel>Is enabled for all subscribers</FormLabel>
                  </div>
                </FormItem>
              )}
            />
            <div className="flex justify-end gap-4 py-3">
              <Button
                variant="outline"
                onClick={() => form.reset()}
                type="button"
              >
                Reset
              </Button>
              <Button type="submit" disabled={isFiltering}>
                {isFiltering ? (
                  <span className="flex items-center">
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Searching...
                  </span>
                ) : (
                  "Search"
                )}
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
