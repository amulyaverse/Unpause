import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'UNPAUSE — Start. Pause. Pick up again.',
  description: 'A student productivity workspace built around resuming where you left off. Start. Pause. Pick up again.',
  icons: {
    icon: '/favicon.ico',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700;800&family=Nunito:wght@400;500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased bg-[#F8F6F0] text-[#30205C] selection:bg-[#C5B4FF] selection:text-[#30205C]">
        {children}
      </body>
    </html>
  );
}
