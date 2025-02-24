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
    >
      <body
        id="body"
        className={`flex h-screen w-full text-gray-300  ${geistSans.variable} ${geistMono.variable} antialiased`}
        style={
          appConfig.background_image
            ? {
                backgroundImage: "url('/assets/wallpaper')",
                backgroundPosition: "center",
                backgroundSize: "cover",
                backgroundAttachment: "fixed",
                transition: "background-image 0.5s ease-in-out",
              }
            : {}
        }
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
