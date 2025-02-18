import { Outlet } from "react-router";
import NavBar from "./navbar";

export default function PageWrapper() {
  return (
    <div className="[--header-height:calc(theme(spacing.20))]">
      <NavBar />
      <main className="min-w-screen flex min-h-[calc(100vh-var(--header-height)-1px)] flex-col items-center justify-between bg-white dark:bg-black">
        <div className="pointer-events-none absolute inset-0 z-[-99] flex items-center justify-center [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
        <Outlet />
      </main>
    </div>
  );
}
