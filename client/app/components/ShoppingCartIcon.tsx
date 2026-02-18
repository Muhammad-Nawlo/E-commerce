"use client";
import Link from "next/link";
import {ShoppingCart} from "lucide-react";
import useCartStore from "@/app/stores/cartStore";

export default function ShoppingCartIcon() {
    const {cart, hasHydrated} = useCartStore()
    if (!hasHydrated) return null;
    return (
        <Link href='/cart' className='relative'>
            <ShoppingCart className='w-4 h-4 text-gray-400'/>
            <span
                className='absolute -top-3 -right-3 bg-amber-400 text-gray-600 rounded-full w-4 h-4 flex items-center justify-center text-xs font-meduim'>{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>
        </Link>
    );
};

