'use client';
import {ProductType} from "@/app/types";
import Link from "next/link";
import Image from "next/image";
import {ShoppingCart} from "lucide-react";
import {useState} from "react";
import useCartStore from "@/app/stores/cartStore";
import {toast} from "react-toastify";

export default function ProductCard({product}: { product: ProductType }) {
    const [productType, setProductType] = useState({
        size: product.sizes[0],
        color: product.colors[0],
    });
    const {addToCart} = useCartStore();

    const handleChangeProductType = (type: 'size' | 'color', value: string) => {
        setProductType((prevState) => ({...prevState, [type]: value}));
    }
    const handleAddToCart = () => {
        addToCart({
            ...product,
            quantity: 1,
            selectedColor: productType.color,
            selectedSize: productType.size,
        })
        toast.success("Product Added Successfully!");
    }
    return (
        <div className="shadow-lg rounded-lg overflow-hidden">
            {/*Image*/}
            <Link href={`/products/${product.id}`}>
                <div className="relative aspect-[2/3]">
                    <Image src={product.images[productType.color]} alt={product.name} fill
                           className='object-cover hover:scale-105 transition-all duration-300'/>
                </div>
            </Link>
            {/*Product detail*/}
            <div className="flex flex-col gap-4 p-4">
                <h2 className='font-medium'>{product.name}</h2>
                <p className='text-sm text-gray-500'>{product.shortDescription}</p>
                {/*Product type*/}
                <div className='flex items-center gap-4 text-xs'>
                    {/*    Sizes*/}
                    <div className='flex flex-col gap-1'>
                        <label htmlFor="size" className='text-gray-500'>Size</label>
                        <select name="size" id="size" className='ring ring-gray-300 rounded-md px-2 py-1'
                                onChange={(e) => handleChangeProductType('size', e.target.value)}>
                            {product.sizes.map(size => <option key={size} value={size}>{size.toUpperCase()}</option>)}
                        </select>
                    </div>
                    {/*    Colors*/}
                    <div className='flex flex-col gap-2'>
                        <label htmlFor="color" className='text-gray-500'>Color</label>
                        <div className='flex items-center gap-2'>
                            {product.colors.map(color => (
                                <div key={color} onClick={() => handleChangeProductType('color', color)}
                                     className={`cursor-pointer border-1 rounded-full p-[1.2px] ${productType.color === color ? 'border-gray-400' : 'border-gray-200'}`}>
                                    <div className='w-[16px] h-[16px] rounded-full'
                                         style={{backgroundColor: color}}></div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/*    Price and Cart button*/}
                <div className='flex items-center justify-between'>
                    <p className='font-medium'>${product.price.toFixed(2)}</p>
                    <button
                        onClick={handleAddToCart}
                        className='ring-1 ring-gray-200 shadow-lg rounded-md px-2 py-1 text-sm cursor-pointer hover:text-white hover:bg-black transition-all duration-300 flex items-center justify-center gap-2'>
                        <ShoppingCart className='w-4 h-4'/> Add to Cart
                    </button>
                </div>
            </div>
        </div>
    );
}