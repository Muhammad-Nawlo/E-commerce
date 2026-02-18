'use client';
import {ProductType} from "@/app/types";
import {usePathname, useRouter, useSearchParams} from "next/navigation";
import {Minus, Plus, ShoppingCart} from "lucide-react";
import {useState} from "react";
import {toast} from "react-toastify";
import useCartStore from "@/app/stores/cartStore";

export default function ProductInteraction({product, selectedSize, selectedColor}: {
    product: ProductType,
    selectedSize: string,
    selectedColor: string
}) {

    const router = useRouter();
    const pathName = usePathname()
    const searchParams = useSearchParams()
    const [quantity, setQuantity] = useState<number>(1);
    const {addToCart} = useCartStore();
    const handleChangeProductType = (type: 'size' | 'color', value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set(type, value);
        router.push(`${pathName}?${params.toString()}`, {scroll: false});
    }
    const handleQuantityChange = (action: 'increase' | 'decrease') => {
        if (action === 'increase') {
            setQuantity((prevQuantity) => prevQuantity + 1);
        } else if (action === 'decrease') {
            setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
        }
    }
    const handleAddToCart = () => {
        addToCart({
            ...product,
            quantity,
            selectedColor,
            selectedSize,
        })
        toast.success('Product Added Successfully!');
    }


    return (
        <div className="flex flex-col gap-4 mt-4">
            {/*SIZE*/}
            <div className='flex flex-col gap-2 text-xs'>
                <span className='text-gray-500'>
                    Size
                </span>
                <div className='flex items-center gap-2'>
                    {product.sizes.map(size => (
                        <div
                            onClick={() => handleChangeProductType('size', size)}
                            key={size}
                            className={`cursor-pointer border  p-0.5 ${selectedSize === size ? 'border-gray-600' : 'border-gray-300'}`}>
                            <div
                                className={`w-6 h-6 text-center flex items-center justify-center uppercase ${selectedSize === size ? "bg-black text-white" : "bg-white text-black"}`}>{size}</div>
                        </div>
                    ))}
                </div>
            </div>
            {/*COLOR*/}
            <div className='flex flex-col gap-2 text-xs'>
                <span className='text-gray-500'>
                    Color
                </span>
                <div className='flex items-center gap-2'>
                    {product.colors.map(color => (
                        <div
                            onClick={() => handleChangeProductType('color', color)}
                            key={color}
                            className={`cursor-pointer border  p-0.5 ${selectedColor === color ? 'border-gray-300' : 'border-white'}`}>
                            <div
                                className={`w-6 h-6`}
                                style={{backgroundColor: color}}
                            />
                        </div>
                    ))}
                </div>
            </div>
            {/*QUANTITY*/}
            <div className='flex flex-col gap-2 text-sm'>
                <span className='text-gray-500'>
                    Quantity
                </span>
                <div className='flex items-center gap-2'>
                    <button
                        className={`border border-gray-300 p-1 ${quantity === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        onClick={() => handleQuantityChange('decrease')}>
                        <Minus className='w-4 h-4'/>
                    </button>
                    <span>{quantity}</span>
                    <button className='cursor-pointer border border-gray-300 p-1'
                            onClick={() => handleQuantityChange('increase')}>
                        <Plus className='w-4 h-4'/>
                    </button>
                </div>
            </div>
            <button onClick={handleAddToCart}
                    className='bg-gray-800 text-white px-4 py-2 rounded-md shadow-lg flex items-center justify-center gap-2 cursor-pointer text-sm font-medium'>
                <Plus className='w-4 h-4'/>
                Add to Cart
            </button>
            <button
                className='ring-1 ring-gray-400 shadow-lg text-gray-800 px-4 py-2 rounded-md flex items-center justify-center gap-2 cursor-pointer text-sm font-medium'>
                <ShoppingCart className='w-4 h-4'/>
                Buy this Item
            </button>
        </div>
    )
}