import AppDefault from "@/components/AppDefault";
import { AuthProvider } from "@/contexts/AuthContext";
import { ConfigurationContextProvider } from "@/contexts/ConfigurationContext";
import { theme } from "@/styles/theme";
import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import { IntlProvider } from "react-intl";
export default function App({ Component, pageProps }: AppProps) {
  return (
    <ConfigurationContextProvider>
      <ChakraProvider resetCSS theme={theme}>
        <AuthProvider>
          <IntlProvider locale={"pt-BR"} messages={{}}>
            <AppDefault>
              <Component {...pageProps} draggable={false} />
            </AppDefault>
          </IntlProvider>
        </AuthProvider>
      </ChakraProvider>
    </ConfigurationContextProvider>
  );
}
