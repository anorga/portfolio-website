import type { Metadata, Viewport } from "next";
import { Geist } from "next/font/google";
import { GoogleTagManager } from "@next/third-parties/google";
import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbar";
import { Footer } from "@/components/footer";
import { AmbientBackdrop } from "@/components/ui/ambient-backdrop";
import { HashNavigation } from "@/components/ui/hash-navigation";
import { site } from "@/content/site";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} | Full Stack Developer`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    url: site.url,
    title: `${site.name} | Full Stack Developer`,
    description: site.description,
    siteName: site.name,
    images: [{ url: "/og.png", width: 1200, height: 630, alt: site.name }],
  },
  twitter: {
    card: "summary_large_image",
    title: `${site.name} | Full Stack Developer`,
    description: site.description,
    images: ["/og.png"],
  },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  colorScheme: "light dark",
  themeColor: "#fafaf9",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <GoogleTagManager gtmId="GTM-5KLL5VQ" />
      <body className={`${geistSans.variable} antialiased`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <HashNavigation />
          <AmbientBackdrop />
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-lg focus:bg-accent-solid focus:px-4 focus:py-2 focus:text-accent-fg"
          >
            Skip to content
          </a>
          <Navbar />
          <main id="main-content" tabIndex={-1}>
            {children}
          </main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
