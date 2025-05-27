import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { getConfiguration } from "./actions/configurationProvider";
import SetupPage from "./components/setupPage";
import Image from "next/image";
import { AppContextComponent } from "./components/Layout/AppContextComponent";
import { SidePanelComponent } from "./components/Layout/SidePanelComponent";
import { IFrontendConfig } from "./interfaces";

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
  const appConfig: IFrontendConfig = await getConfiguration();

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
        <div className="fixed inset-0 -z-50">
          <Image
            src="/assets/wallpaper"
            alt=""
            fill={true}
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gray-950/75" />
        </div>
        {appConfig.configured ? (
          <div className="flex w-screen h-screen">
            <SidePanelComponent appConfig={appConfig} />
            <div className="w-[15%] 2xl:w-[10%]" />
            <div className="w-[85%] 2xl:w-[90%] p-4 [&::-webkit-scrollbar]:w-0">
              <AppContextComponent appConfig={appConfig}>
                {children}
              </AppContextComponent>
            </div>
          </div>
        ) : (
          <SetupPage />
        )}
      </body>
    </html>
  );
}
