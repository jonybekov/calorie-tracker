import "react-dates/initialize";

import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HomePage } from "./home/home-page";
import {
  ChakraProvider,
  extendTheme,
  theme as baseTheme,
} from "@chakra-ui/react";
import { Global } from "@emotion/react";
import { QueryClientProvider } from "@tanstack/react-query";
import { queryClient } from "./shared/api";
import { GlobalContextProvider } from "./app/contexts/global.context";
import { LoginPage } from "./auth/login-page";
import { RegisterPage } from "./auth/register-page";
import { AppLayout } from "./shared/layouts";

import "react-dates/lib/css/_datepicker.css";
import { DashboardPage } from "./dashboard/dashboard-page";

const Fonts = () => {
  return (
    <Global
      styles={`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
  `}
    />
  );
};

const theme = extendTheme({
  fonts: {
    heading: `Inter, sans-serif`,
    body: `Inter, sans-serif`,
  },
  shadows: {
    avatar: `0 0 0 4px ${baseTheme.colors.gray[300]}`,
  },
  components: {
    FormLabel: {
      baseStyle: {
        color: "gray.500",
      },
    },
  },
});

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <GlobalContextProvider>
        <ChakraProvider theme={theme}>
          <Fonts />
          <AppLayout>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="dashboard" element={<DashboardPage />} />
                <Route path="login" element={<LoginPage />} />
                <Route path="register" element={<RegisterPage />} />
              </Routes>
            </BrowserRouter>
          </AppLayout>
        </ChakraProvider>
      </GlobalContextProvider>
    </QueryClientProvider>
  );
}

export default App;
