"use client";
import { LayoutProvider } from "../../layout/context/layoutcontext";
import Layout from "../../layout/layout";
import { PrimeReactProvider } from "primereact/api";

import "../styles/layout/layout.scss";
import "primeflex/primeflex.css";
import "primeicons/primeicons.css";
import "primereact/resources/primereact.css";

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link
          id="theme-link"
          href={`${
            process.env.NODE_ENV === "production" ? "/apollo-react" : ""
          }/theme/theme-light/indigo/theme.css`}
          rel="stylesheet"
        />
      </head>
      <body>
        <PrimeReactProvider>
          <LayoutProvider>
            <Layout>{children}</Layout>
          </LayoutProvider>
        </PrimeReactProvider>
      </body>
    </html>
  );
}
