import { ReactNode } from "react";
import { ClerkProvider } from "@clerk/clerk-react";

type AuthProviderProps = {
  children: ReactNode;
};

export function AuthProvider({ children }: AuthProviderProps) {
  const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;

  if (!PUBLISHABLE_KEY) {
    throw new Error("Missing Publishable Key");
  }

  return (
    <ClerkProvider publishableKey={PUBLISHABLE_KEY}>{children}</ClerkProvider>
  );
}
