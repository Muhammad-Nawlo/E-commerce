import Image from "next/image";
import ProductList from "@/app/components/ProductList";

export default async function Home({searchParams}: { searchParams: Promise<{ category: string }>; }) {
    const category = (await searchParams).category;
    return (
        <div>
            <div className="relative aspect-[3/1] mb-12">
                <Image src='/featured.png' alt='featured image' fill/>
            </div>
            <ProductList category={category} params='homepage'/>
        </div>
    );
}
