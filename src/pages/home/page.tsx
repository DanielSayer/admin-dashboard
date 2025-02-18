import { Hero } from "./hero";
import { Features } from "./features";
import { Billing } from "./billing";

export default function HomePage() {
  return (
    <>
      <div className="mt-[1rem] flex w-full flex-col items-center justify-center p-3">
        <Hero />
      </div>
      <Features />
      <Billing />
      <div className="h-36"></div>
    </>
  );
}
