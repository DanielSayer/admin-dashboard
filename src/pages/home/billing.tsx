import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";
import { CheckCircle2, DollarSign } from "lucide-react";
import { motion } from "motion/react";
import { useState } from "react";
import { Link } from "react-router";

type PlanLength = "month" | "year";
type PricingSwitchProps = {
  onSwitch: (value: PlanLength) => void;
};

type PricingCardProps = {
  planLength: PlanLength;
  title: string;
  monthlyPrice?: number;
  yearlyPrice?: number;
  description: string;
  features: string[];
  actionLabel: string;
  popular?: boolean;
  exclusive?: boolean;
};

const PricingHeader = ({
  title,
  subtitle,
}: {
  title: string;
  subtitle: string;
}) => (
  <div className="mb-10 text-center">
    {/* Pill badge */}
    <div className="mx-auto mb-6 w-fit rounded-full border border-blue-200 bg-blue-50 px-4 py-1 dark:border-blue-900 dark:bg-blue-900/30">
      <div className="flex items-center gap-2 text-sm font-medium text-blue-900 dark:text-blue-200">
        <DollarSign className="h-4 w-4" />
        <span>Pricing</span>
      </div>
    </div>

    <h2 className="bg-gradient-to-r from-gray-900 via-blue-800 to-gray-900 bg-clip-text pb-2 text-3xl font-bold text-transparent dark:from-white dark:via-blue-300 dark:to-white md:text-4xl">
      {title}
    </h2>
    <p className="mx-auto mt-4 max-w-2xl text-gray-600 dark:text-gray-300">
      {subtitle}
    </p>
  </div>
);

const PricingSwitch = ({ onSwitch }: PricingSwitchProps) => (
  <div className="flex items-center justify-center gap-3">
    <Tabs
      defaultValue="month"
      className="w-[400px]"
      onValueChange={(v) => onSwitch(v as PlanLength)}
    >
      <TabsList className="w-full">
        <TabsTrigger value="month" className="w-full">
          Monthly
        </TabsTrigger>
        <TabsTrigger value="year" className="w-full">
          Yearly
        </TabsTrigger>
      </TabsList>
    </Tabs>
  </div>
);

const PricingCard = ({
  planLength,
  title,
  monthlyPrice,
  yearlyPrice,
  description,
  features,
  actionLabel,
  popular,
  exclusive,
}: PricingCardProps) => {
  return (
    <Card
      className={cn("flex w-full max-w-sm flex-col justify-between px-2 py-1", {
        "relative border-2 border-blue-500 dark:border-blue-400": popular,
        "bg-gradient-to-b from-gray-900 to-gray-800 text-white shadow-2xl":
          exclusive,
      })}
    >
      {popular && (
        <div className="absolute -top-3 left-0 right-0 mx-auto w-fit rounded-full bg-blue-500 px-3 py-1 dark:bg-blue-400">
          <p className="text-sm font-medium text-white">Most Popular</p>
        </div>
      )}

      <div>
        <CardHeader className="space-y-2 pb-4">
          <CardTitle className="text-xl">{title}</CardTitle>
          <CardDescription
            className={cn("", {
              "text-gray-300": exclusive,
            })}
          >
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="pb-4">
          <div className="flex items-baseline gap-1">
            <span
              className={cn("text-4xl font-bold", {
                "text-white": exclusive,
              })}
            >
              {planLength === "year" ? yearlyPrice : monthlyPrice} 🍕
            </span>
            <span
              className={cn("text-muted-foreground", {
                "text-gray-300": exclusive,
              })}
            >
              {planLength === "year" ? "/yr" : "/mo"}
            </span>
          </div>

          <div className="mt-6 space-y-2">
            {features.map((feature) => (
              <div key={feature} className="flex gap-2">
                <CheckCircle2
                  className={cn("h-5 w-5 text-blue-500", {
                    "text-blue-400": exclusive,
                  })}
                />
                <p
                  className={cn("text-muted-foreground", {
                    "text-gray-300": exclusive,
                  })}
                >
                  {feature}
                </p>
              </div>
            ))}
          </div>
        </CardContent>
      </div>

      <CardFooter>
        <Link
          to="/dashboard"
          className={cn(buttonVariants(), "w-full", {
            "bg-blue-500 text-white hover:bg-blue-400": popular,
            "bg-white text-gray-900 hover:bg-gray-100": exclusive,
          })}
        >
          {actionLabel}
        </Link>
      </CardFooter>
    </Card>
  );
};

export function Billing() {
  const [planLength, setPlanLength] = useState<PlanLength>("month");

  const plans = [
    {
      title: "Pro",
      monthlyPrice: 1,
      yearlyPrice: 3,
      description: "Advanced features for growing teams and businesses.",
      features: [
        "All Basic features",
        "Up to 20 team members",
        "50GB storage",
        "Priority support",
        "Advanced analytics",
      ],
      actionLabel: "Get Pro",
      popular: true,
    },
  ];

  return (
    <section className="px-4">
      <div className="mx-auto max-w-7xl">
        <PricingHeader
          title="Choose Your Plan"
          subtitle="Select the perfect plan for your needs. All plans include a 14-day free trial."
        />
        <PricingSwitch onSwitch={setPlanLength} />
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-10 flex justify-center"
        >
          {plans.map((plan) => (
            <PricingCard key={plan.title} {...plan} planLength={planLength} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
