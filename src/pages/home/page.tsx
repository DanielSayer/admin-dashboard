import PageWrapper from "@/components/layout/page-wrapper";
import { Hero } from "./hero";
import { Features } from "./features";

export default function HomePage() {
  return (
    <PageWrapper>
      <div className="flex flex-col justify-center items-center w-full mt-[1rem] p-3">
        <Hero />
      </div>
      <Features />
    </PageWrapper>
  );
}
