import { AppProps } from "next/app";

import "@/styles/globals.css";
import "react-loading-skeleton/dist/skeleton.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/services/query-client";
import { ApplicationProvider } from "@/contexts/application";
import { AuthProvider } from "@/contexts/auth-provider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApplicationProvider establishment={pageProps.establishment}>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <Component {...pageProps} />
        </AuthProvider>
      </QueryClientProvider>
    </ApplicationProvider>
  );
}
