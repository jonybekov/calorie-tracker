import "react-dates/initialize";

import { ChakraProvider } from "@chakra-ui/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "../shared/api";
import { GlobalContextProvider } from "./contexts";
import { AppLayout } from "../shared/layouts";
import { Fonts, theme } from "../shared/config";
import { Routes } from "./routes/routes";

import "react-dates/lib/css/_datepicker.css";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <Fonts />
        <AppLayout>
          <GlobalContextProvider>
            <Routes />
          </GlobalContextProvider>
        </AppLayout>
      </ChakraProvider>
    </QueryClientProvider>
  );
}
