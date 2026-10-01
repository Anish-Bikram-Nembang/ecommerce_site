import { ShoppingCart, Star } from "lucide-react";
import { Link } from "react-router";

export interface ProductCardProps {
    id: number;
    name: string;
    price: number;
    image: string;
    rating?: { rate: number; count: number };
    category?: string;
    onAddToCart: () => void;
}

function ProductCard({ id, name, price, image, rating, category, onAddToCart }: ProductCardProps) {
    return (
        <article className="flex flex-col rounded-xl bg-white p-3 dark:bg-[#1f1f1f]">
            <Link to={`/product/${id}`} className="relative flex aspect-square items-center justify-center rounded-lg bg-gray-50 p-6 dark:bg-white">
                {category && <span className="absolute left-2 top-2 rounded bg-white px-2 py-0.5 text-[11px] font-semibold capitalize text-gray-700">{category}</span>}
                <img src={image} alt={name} className="h-full w-full object-contain" />
            </Link>
            <div className="flex flex-1 flex-col pt-3">
                <p className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                    <Star size={13} className="fill-amber-400 text-amber-400" />
                    {rating ? <><span className="font-semibold text-gray-800 dark:text-gray-200">{rating.rate.toFixed(1)}</span> ({rating.count})</> : "No ratings yet"}
                </p>
                <Link to={`/product/${id}`} className="mt-1 line-clamp-2 text-sm font-semibold hover:underline">{name}</Link>
                <p className="mt-auto pt-2 text-lg font-bold">${price.toFixed(2)}</p>
                <button type="button" onClick={onAddToCart} className="mt-3 flex w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-black py-2 text-sm text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                    <ShoppingCart size={15} /> Add to Cart
                </button>
            </div>
        </article>
    );
}
export default ProductCard;
