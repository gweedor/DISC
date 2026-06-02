import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Team Communication Assessment',
  description:
    'A DISC-style team communication assessment for internal team-building. Not an official or clinical DISC assessment.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
