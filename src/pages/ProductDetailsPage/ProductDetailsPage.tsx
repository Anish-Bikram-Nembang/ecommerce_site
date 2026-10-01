import { useEffect, useState } from "react";
import { ArrowLeft, ShoppingCart, Star } from "lucide-react";
import { Link, useParams } from "react-router";
import { useStore } from "../../store/useStore";
import type { Product } from "../../store/StoreContext";

function ProductDetailsPage() {
    const { id } = useParams();
    const { products, addToCart } = useStore();
    const productFromStore = products.find(item => item.id === Number(id));

    // used when the page is opened directly (eg. after a refresh) and the store is still empty
    const [fetchedProduct, setFetchedProduct] = useState<Product | null>(null);
    const [loading, setLoading] = useState(!productFromStore);

    useEffect(() => {
        if (productFromStore) return;
        let ignore = false;
        async function fetchProduct() {
            try {
                const response = await fetch(`https://fakestoreapi.com/products/${id}`);
                // the api sends back an empty body for ids that don't exist
                const text = await response.text();
                if (!ignore && response.ok && text) setFetchedProduct(JSON.parse(text));
            } catch {
                // if this fails we just show the "not found" message below
            } finally {
                if (!ignore) setLoading(false);
            }
        }
        fetchProduct();
        return () => { ignore = true; };
    }, [id, productFromStore]);

    const product = productFromStore ?? fetchedProduct;

    if (loading) return <p className="p-8 text-center text-gray-500">Loading product...</p>;
    if (!product) {
        return (
            <div className="p-8 text-center">
                <p className="text-lg font-semibold">Product not found</p>
                <Link className="mt-2 inline-block text-sm text-blue-600 underline" to="/">Back to shop</Link>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
            <div className="flex items-center justify-between">
                <Link to="/" className="flex items-center gap-1 text-sm text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                    <ArrowLeft size={16} /> Back to Shop
                </Link>
                <span className="rounded-full bg-gray-200 px-3 py-1 text-xs font-semibold uppercase text-gray-700 dark:bg-white/10 dark:text-gray-300">{product.category}</span>
            </div>

            <div className="mt-6 grid gap-6 md:grid-cols-2">
                <div className="flex min-h-80 items-center justify-center rounded-xl bg-white p-10">
                    <img src={product.image} alt={product.title} className="max-h-80 object-contain" />
                </div>
                <div className="rounded-xl bg-white p-6 dark:bg-[#1f1f1f]">
                    {product.rating && (
                        <p className="flex items-center gap-1 text-sm text-gray-600 dark:text-gray-400">
                            <Star size={15} className="fill-amber-400 text-amber-400" />
                            <span className="font-semibold text-gray-900 dark:text-white">{product.rating.rate.toFixed(1)}</span> / 5
                            <span className="ml-1">({product.rating.count} reviews)</span>
                        </p>
                    )}
                    <h1 className="mt-3 text-2xl font-semibold sm:text-3xl">{product.title}</h1>
                    <p className="mt-4 text-3xl font-bold">${product.price.toFixed(2)}</p>
                    <p className="mt-4 text-sm leading-6 text-gray-600 dark:text-gray-400">{product.description || "No description available."}</p>
                    <button type="button" onClick={() => addToCart(product)} className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-black py-3 text-sm text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                        <ShoppingCart size={16} /> Add to Cart
                    </button>
                    <Link to="/cart" className="mt-3 block text-center text-sm text-blue-600 hover:underline">Go to cart</Link>
                </div>
            </div>
        </div>
    );
}
export default ProductDetailsPage;
