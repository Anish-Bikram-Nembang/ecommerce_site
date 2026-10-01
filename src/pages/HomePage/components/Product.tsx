import { Plus } from "lucide-react";
import { Link } from "react-router";
import type { Product as ProductType } from "../../../store/StoreContext";

export type IProduct = ProductType;
function Product({ product, onAdd }: { product: IProduct; onAdd: (product: IProduct) => void }) {
    return (
        <article className="group flex flex-col rounded-2xl border border-black/5 bg-white p-3 shadow-sm dark:border-[#4b4b4b] dark:bg-[#292929]">
            <Link to={`/product/${product.id}`} className="flex aspect-square items-center justify-center overflow-hidden rounded-xl bg-[#F4F5F6] p-4 dark:bg-[#292929]">
                <img src={product.image} alt={product.title} className="h-full w-full object-contain" />
            </Link>
            <div className="flex min-h-[94px] flex-col justify-between gap-2 pt-3">
                <Link to={`/product/${product.id}`} className="line-clamp-2 text-sm font-semibold leading-5">{product.title}</Link>
                <div className="flex items-center justify-between dark:text-white">
                    <p className="font-semibold">NPR {product.price.toFixed(2)}</p>
                    <button onClick={() => onAdd(product)} className="flex cursor-pointer items-center gap-1 rounded-lg bg-black px-2.5 py-1.5 text-xs text-white hover:bg-[#2E3132] dark:bg-white dark:text-black dark:hover:bg-[#e5e5e5]">
                        <Plus size={12} /> Add
                    </button>
                </div>
            </div>
        </article>
    )
}
export default Product;
