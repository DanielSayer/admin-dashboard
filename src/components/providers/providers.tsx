import { ReactNode } from "react";
import { AuthProvider } from "./auth-provider";
import { ThemeProvider } from "./theme/theme-provider";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "../ui/sonner";

type ProvidersProps = {
  children: ReactNode;
};

const client = new QueryClient();

export function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      <QueryClientProvider client={client}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          {children}
          <Toaster richColors />
        </ThemeProvider>
      </QueryClientProvider>
    </AuthProvider>
  );
}
