import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Geist, Geist_Mono } from "next/font/google";
import { SiteHeader } from "@/components/site-header";
import { SiteFooter } from "@/components/site-footer";
import { SmoothScroll } from "@/components/motion/smooth-scroll";
import { profile } from "@/data/profile";
import "./globals.css";

const geist = Geist({ variable: "--font-geist", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });
const bricolage = Bricolage_Grotesque({
  variable: "--font-bricolage",
  subsets: ["latin"],
  axes: ["opsz", "wdth"],
});

export const metadata: Metadata = {
  metadataBase: new URL(profile.siteUrl),
  title: {
    default: `${profile.name} — Backend & AI engineer`,
    template: `%s — ${profile.name}`,
  },
  description: profile.tagline,
  openGraph: {
    type: "website",
    siteName: profile.name,
    title: profile.name,
    description: profile.tagline,
  },
  // The light paper look is the design; ask the Dark Reader extension not to invert it.
  other: { "darkreader-lock": "true" },
};

export const viewport: Viewport = {
  themeColor: "#f2eee5",
  colorScheme: "light",
};

// Runs before paint: marks that JS is on so reveal styles only hide content
// when the animation that un-hides it will actually run.
const jsFlag = `document.documentElement.classList.add('js')`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geist.variable} ${geistMono.variable} ${bricolage.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: jsFlag }} />
      </head>
      <body className="flex min-h-svh flex-col">
        <a
          href="#main"
          className="label sr-only z-50 bg-ink px-3 py-2 text-paper focus:not-sr-only focus:fixed focus:top-3 focus:left-3"
        >
          Skip to content
        </a>
        <SmoothScroll />
        <SiteHeader />
        <main id="main" className="flex-1">
          {children}
        </main>
        <SiteFooter />
      </body>
    </html>
  );
}
