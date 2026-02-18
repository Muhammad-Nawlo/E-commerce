import Image from "next/image";
import Link from "next/link";
import SearchBar from "@/app/components/SearchBar";
import {Bell, Home, ShoppingCart} from "lucide-react";
import ShoppingCartIcon from "@/app/components/ShoppingCartIcon";

export default function Navbar() {
    return (
        <nav className="w-full flex items-center justify-between border-b border-gray-200 pb-4">

            {/*  Left */}
            <Link href="/" className='flex items-center'>
                <Image src='/logo.png' alt='Logo'
                       width={36}
                       height={36}
                       className='w-6 h-6 md:w-9 md:h-9'
                />
                <p className='hidden md:block text-md font-medium tracking-wider'>Nawlo.</p>
            </Link>


            {/*  Right */}
            <div className='flex items-center gap-6'>
                <SearchBar/>
                <Link href="/">
                    <Home className='w-4 h-4 text-gray-600'/>
                </Link>
                <Bell className='w-4 h-4 text-gray-600'/>
                <ShoppingCartIcon />
                <Link href="/">
                    Login
                </Link>
            </div>
        </nav>
    );
}