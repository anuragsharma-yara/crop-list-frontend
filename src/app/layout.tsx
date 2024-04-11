import type { Metadata } from "next";
import "./globals.css";

import Nav from "@/components/Nav";
import AuthProvider from "@/contexts/AuthProvider";

export const metadata: Metadata = {
  title: "Crop List App",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className='bg-gray-100'>
        <AuthProvider>
          <Nav />
          <div className="m-2">{children}</div>
        </AuthProvider>
      </body>
    </html>
  );
}
