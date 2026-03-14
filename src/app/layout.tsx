import type { Metadata, Viewport } from "next";
import "./globals.css";

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  themeColor: "#1d4ed8",
};

export const metadata: Metadata = {
  title: "TRAFFIC INFO TUNISIE - إدارة شرطة المرور",
  description: "تطبيق السلامة المرورية التونسية - معلومات حية عن حالة الطرق، البلاغات المرورية، أرقام الطوارئ",
  manifest: "/manifest.json",
  icons: {
    icon: "/logo-official.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ar" dir="rtl" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#1d4ed8" />
      </head>
      <body className="antialiased bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
