// app/layout.js
import Navbar from "@/app/components/Navbar";
import AppBar from "@/app/components/Appbar";
import "./globals.css";
import { getCurrentUser } from "@/lib/auth";

export default async function RootLayout({ children }) {
  const user = await getCurrentUser();

  return (
    <html lang="en">
      <body>
        {user && <AppBar />}
        <main className="py-20 p-4 max-w-6xl mx-auto">{children}</main>
        {user && <Navbar />}
      </body>
    </html>
  );
}
