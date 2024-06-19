import "./globals.css";
import { Inter, IBM_Plex_Sans } from "next/font/google";
import NavBar from "Components/NavBar";
import ThemeRegistry from "styles/theme/ThemeRegistry";
import React from "react";
import { Providers } from "state/Providers";
import { SnackbarProvider } from "utills/SnackbarContext";
import { AuthProvider } from "utills/AuthContext";
import { ReactQueryClientProvider } from "Components/ReactQuery/ReactQueryClientProvider";
import { ModalProvider } from "utills/ServerDownContext";

const inter = Inter({ subsets: ["latin"] });
const ibm_plex_sans = IBM_Plex_Sans({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
});

export const metadata = {
  title: "AcreBytes - Empowering better Real Estate decisions",
  description: "AcreBytes is a platform that helps you make better decisions when buying property by providing detailed listings of thoroughly researched properties and connecting you with registered real estate consultants.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link href="https://fonts.googleapis.com/css2?family=Inter+Tight:ital,wght@0,100..900;1,100..900&display=swap" rel="stylesheet" />

        <meta name="description" content="AcreBytes is a platform that helps you make better decisions when buying property by providing detailed listings of thoroughly researched properties and connecting you with registered real estate consultants."></meta>
        <meta name="keywords" content="acrebytes, property, property leads, Real estate, property consultant, property real estate dealers"></meta>
      </head>
      <body className={ibm_plex_sans.className}>
        <ReactQueryClientProvider>
          <Providers>
            <ThemeRegistry options={{ key: "css" }}>
              <AuthProvider>
                <SnackbarProvider>
                  <ModalProvider>
                    <NavBar>{children}</NavBar>
                  </ModalProvider>
                </SnackbarProvider>
              </AuthProvider>
            </ThemeRegistry>
          </Providers>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
