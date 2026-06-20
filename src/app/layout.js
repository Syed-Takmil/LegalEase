import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/Components/shared/NavBar";
import Footer from "@/Components/shared/Footer";
import { ToastContainer } from "react-toastify";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Legal Ease",
  description: "Online Lawyer Hiring PLatform",
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en" data-theme="dark"
      className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className=" overflow-y-auto no-scrollbar  flex flex-col">
        <Navbar/>
        {children}
        
        <Footer/>
        <ToastContainer/>
        </body>
    </html>
  );
}
