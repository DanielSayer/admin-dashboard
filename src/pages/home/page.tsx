import { Hero } from "./hero";
import { Features } from "./features";

export default function HomePage() {
  return (
    <>
      <div className="flex flex-col justify-center items-center w-full mt-[1rem] p-3">
        <Hero />
      </div>
      <Features />
    </>
  );
}
