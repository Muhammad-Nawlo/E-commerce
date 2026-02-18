import type {Metadata} from "next";
import {Geist, Geist_Mono} from "next/font/google";
import "./globals.css";
import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";
import {ToastContainer} from "react-toastify";

const geistSans = Geist({
    variable: "--font-geist-sans",
    subsets: ["latin"],
});

const geistMono = Geist_Mono({
    variable: "--font-geist-mono",
    subsets: ["latin"],
});

export const metadata: Metadata = {
    title: "Nawlo Store - Your One-Stop Shop for Trendy Apparel",
    description: "Discover the latest fashion trends at Nawlo Store. Shop our wide selection of stylish clothing, accessories, and more. Enjoy fast shipping and excellent customer service. Elevate your wardrobe with Nawlo Store today!",
};

export default function RootLayout({
                                       children,
                                   }: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en">
        <body
            className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
        <div className="mx-auto p-4 sm:px-0 sm:max-w-xl md:max-w-2xl lg:mx-w-3xl xl:max-w-6xl">
            <Navbar/>
            {children}
            <Footer/>
        </div>
        <ToastContainer position="bottom-right"/>
        </body>
        </html>
    );
}
