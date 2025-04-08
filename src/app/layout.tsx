import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ClientLayout from "./components/clientlayout";
import { getConfiguration } from "./actions/configurationProvider";
import SetupPage from "./components/setupPage";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Anisquid Observer",
  description: "AniSquid Observer Management",
  icons: "icon.ico",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const appConfig = await getConfiguration();

  return (
    <html
      id="html"
      lang="en"
      className={`max-w-screen max-h-screen bg-gray-900 no-text-cursor`}
      style={
        appConfig.background_image
          ? {
              backgroundImage: "url('/assets/wallpaper')",
              backgroundPosition: "center",
              backgroundSize: "cover",
              backgroundAttachment: "fixed",
              backgroundColor: "rgba(17, 24, 39, 0.75)",
              backgroundBlendMode: "overlay",
              backdropFilter: "blur(4px)",
              zIndex: -1,
            }
          : {}
      }
    >
      <body
        id="body"
        className={`flex h-screen w-full text-gray-300  ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {appConfig.configured ? (
          <ClientLayout appConfig={appConfig}>{children}</ClientLayout>
        ) : (
          <SetupPage />
        )}
      </body>
    </html>
  );
}
