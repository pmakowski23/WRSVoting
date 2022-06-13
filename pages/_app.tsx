import type { AppProps } from "next/app";
import "../styles/globals.css";

import { UserProvider } from "@supabase/supabase-auth-helpers/react";
import { supabaseClient } from "@supabase/supabase-auth-helpers/nextjs";
import { MantineProvider } from "@mantine/core";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        colorScheme: "dark",
      }}
    >
      <UserProvider supabaseClient={supabaseClient}>
        <Component {...pageProps} />
      </UserProvider>
    </MantineProvider>
  );
}

export default MyApp;
