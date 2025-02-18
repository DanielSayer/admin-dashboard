import { Hero } from "./hero";
import { Features } from "./features";
import { Billing } from "./billing";
import { Spotlight } from "@/components/ui/spotlight";

export default function HomePage() {
  return (
    <div className="relative flex w-full flex-col overflow-hidden rounded-md bg-zinc-100 antialiased dark:bg-black/[0.96] md:items-center md:justify-center">
      <Spotlight />
      <div className="mt-[1rem] flex w-full flex-col items-center justify-center p-3">
        <Hero />
      </div>
      <Features />
      <Billing />
      <div className="h-36"></div>
    </div>
  );
}
