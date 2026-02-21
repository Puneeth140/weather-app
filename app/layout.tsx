import type { Metadata } from "next";
import "./globals.css";
import { Orbitron, Playpen_Sans } from 'next/font/google';

const orbitron = Orbitron({ subsets: ['latin'], variable: '--font-orbitron' });
const playpen = Playpen_Sans({ subsets: ['latin'], variable: '--font-playpen' });

export const metadata = {
  title: 'NEURAL-WEATHER',
  description: 'Cyberpunk Weather Interface',
};
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${orbitron.variable} ${playpen.variable}`}>
        {children}
      </body>
    </html>
  );
}
