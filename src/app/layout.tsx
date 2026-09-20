import type { Metadata, Viewport } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "چرم میش | MISH LEATHER — اصالت، در جزئیات ساخته می‌شود",
  description:
    "چرم میش؛ خانه‌ی چرم دست‌دوز ایرانی. کفش، کیف، کمربند و کیف پول از چرم طبیعی درجه‌یک، ساخته‌شده در تهران با ضمانت مادام‌العمر دوخت.",
  keywords: ["چرم میش", "کیف چرم", "کفش چرم دست‌دوز", "چرم طبیعی", "MISH LEATHER"],
};

export const viewport: Viewport = {
  themeColor: "#0a0806",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fa" dir="rtl" suppressHydrationWarning>
      <body className="antialiased bg-ink text-cream">{children}</body>
    </html>
  );
}
