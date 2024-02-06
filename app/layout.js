import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "MyBRO | Demo",
  description: "Malaysian Bot Record Optimizer (MyBRO) by Pusat Informatik Kesihatan & National Institute of Health Malaysia",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
