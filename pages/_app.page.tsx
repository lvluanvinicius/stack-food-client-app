import { AppProps } from "next/app";

import "@/styles/globals.css";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "@/services/query-client";
import { ApplicationProvider } from "@/contexts/application";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ApplicationProvider establishment={pageProps.establishment}>
      <QueryClientProvider client={queryClient}>
        <Component {...pageProps} />
      </QueryClientProvider>
    </ApplicationProvider>
  );
}
