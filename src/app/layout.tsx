import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import ClientLayout from "./components/clientlayout";
import { getConfiguration } from "./actions/configurationProvider";
import SetupPage from "./components/setupPage";
import Image from "next/image";

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

export async function generateMetadata(): Promise<Metadata> {
  const appConfig = await getConfiguration();
  return {
    title: `${appConfig.appName}`,
    icons: { icon: "icon.png", apple: "apple-icon.png" },
    description: `${appConfig.appName} version: ${appConfig.appVersion}`,
  };
}

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
      >
        {appConfig.background_image && (
          <div className="fixed inset-0 -z-50">
            <Image
              src="/assets/wallpaper"
              alt=""
              fill={true}
              className="object-cover bg-no-repeat"
              priority={true}
              unoptimized={true}
            />
            <div className="absolute inset-0 bg-gray-950/75" />
          </div>
        )}
        {appConfig.configured ? (
          <ClientLayout appConfig={appConfig}>{children}</ClientLayout>
        ) : (
          <SetupPage />
        )}
      </body>
    </html>
  );
}
