import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://girard-plomberie-demo.vercel.app",
  ),
  title: "Girard Plomberie | Installation, dépannage et débouchage",
  description:
    "Girard Plomberie intervient pour les fuites, sanitaires, débouchages, chauffe-eau, ballons d’eau chaude et raccordements.",
  applicationName: "Girard Plomberie",
  icons: {
    icon: "/girard-plomberie/icon.png",
    apple: "/girard-plomberie/icon.png",
  },
  openGraph: {
    title: "Girard Plomberie",
    description:
      "Installation et dépannage de plomberie : fuites, sanitaires, débouchage et chauffe-eau.",
    images: ["/girard-plomberie/remplacement-ballon-eau-chaude.jpg"],
    locale: "fr_FR",
    type: "website",
  },
  robots: {
    index: false,
    follow: false,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
    },
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>{children}</body>
    </html>
  );
}
