import type { Metadata } from "next";
import { Heebo } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar"; // נבנה בהמשך
import Footer from "@/components/layout/Footer"; // נבנה בהמשך

// טעינת פונט אופטימלית
const heebo = Heebo({
  subsets: ["hebrew", "latin"],
  weight: ["100", "300", "400", "500", "700"], // 100 ו-300 קריטיים למראה היוקרתי הדק
  variable: "--font-heebo",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    template: "%s | Multibrawn Bridal",
    default: "Multibrawn Bridal | סוויטת התארגנות לכלות",
  },
  description: "חווית התארגנות שקטה, יוקרתית ופוטוגנית לכלות שמבינות. המקום שבו היום שלך מתחיל.",
  openGraph: {
    type: 'website',
    locale: 'he_IL',
    url: 'https://multibrawn.co.il',
    siteName: 'Multibrawn Bridal',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="he" dir="rtl" className="scroll-smooth">
      <body className={`${heebo.variable} font-sans min-h-screen flex flex-col`}>
        {/* Navbar יצוף מעל הכל */}
        <Navbar /> 
        
        <main className="flex-grow">
          {children}
        </main>
        
        <Footer />
      </body>
    </html>
  );
}
