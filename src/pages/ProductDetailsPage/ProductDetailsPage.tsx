import { Link, useParams } from "react-router";
import { useStore } from "../../store/useStore";

function ProductDetailsPage() {
    const { id } = useParams();
    const { products, addToCart } = useStore();
    const product = products.find(item => item.id === Number(id));
    if (!product) return <p className="p-8 text-center">Product not found. <Link className="underline" to="/">Go home</Link></p>;
    return <div className="mx-auto grid max-w-5xl gap-8 px-4 py-10 sm:px-6 md:grid-cols-2">
        <div className="flex min-h-80 items-center justify-center rounded-3xl border border-transparent bg-white p-10 dark:border-[#4b4b4b] dark:bg-[#292929]"><img src={product.image} alt={product.title} className="max-h-80 object-contain" /></div>
        <div className="self-center">
            <p className="text-xs uppercase tracking-widest text-black/50">{product.category}</p>
            <h1 className="mt-3 text-3xl font-semibold">{product.title}</h1>
            {product.rating && <p className="mt-3 text-sm text-black/60">★ {product.rating.rate.toFixed(1)} <span className="text-black/40">({product.rating.count} reviews)</span></p>}
            <p className="mt-5 text-2xl font-semibold">NPR {product.price.toFixed(2)}</p>
            <p className="mt-5 text-sm leading-6 text-black/65">{product.description || "A thoughtfully selected everyday essential."}</p>
            <button onClick={() => addToCart(product)} className="mt-7 rounded-full bg-black px-5 py-3 text-sm text-white">Add to cart</button>
        </div>
    </div>;
}
export default ProductDetailsPage;
