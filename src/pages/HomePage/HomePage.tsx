import { useEffect, useMemo, useState } from "react";
import Searchbar from "./components/Searchbar";
import ProductList from "./components/ProductList";
import ProductSkeletonList from "./components/ProductSkeletonList";
import { useStore } from "../../store/useStore";
import type { Product } from "../../store/StoreContext";

// change this to a wrong url (eg. /productss) to test the error message
const API_URL = "https://fakestoreapi.com/products";

function HomePage() {
    const { products, setProducts, addToCart } = useStore();
    const [search, setSearch] = useState("");
    const [category, setCategory] = useState("all");
    const [sort, setSort] = useState("default");
    // only show the loading state the first time, not every time we come back to this page
    const [loading, setLoading] = useState(products.length === 0);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        let ignore = false;
        async function fetchProducts() {
            try {
                const response = await fetch(API_URL);
                if (!response.ok) {
                    throw new Error(`Could not load products (status ${response.status}).`);
                }
                const data: Product[] = await response.json();
                if (ignore) return;
                // keep products added through the form at the top
                setProducts(current => {
                    const addedByUser = current.filter(product => !data.some(item => item.id === product.id));
                    return [...addedByUser, ...data];
                });
            } catch (e) {
                if (!ignore) setError(e instanceof Error ? e.message : "Something went wrong.");
            } finally {
                if (!ignore) setLoading(false);
            }
        }
        fetchProducts();
        return () => { ignore = true; };
    }, [setProducts]);

    const categories = useMemo(() => ["all", ...new Set(products.map(product => product.category))], [products]);

    const visibleProducts = useMemo(() => {
        const filtered = products.filter(product =>
            product.title.toLowerCase().includes(search.toLowerCase()) &&
            (category === "all" || product.category === category)
        );
        if (sort === "low") return [...filtered].sort((a, b) => a.price - b.price);
        if (sort === "high") return [...filtered].sort((a, b) => b.price - a.price);
        return filtered;
    }, [products, search, category, sort]);

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-semibold sm:text-4xl">Discover Products</h1>
            <p className="mt-1 text-gray-600 dark:text-gray-400">Browse the products below and add them to your cart.</p>

            <div className="mt-6 flex flex-col gap-4 rounded-xl bg-white p-4 dark:bg-[#1f1f1f]">
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <Searchbar placeholder="Search products..." value={search} onChange={e => setSearch(e.target.value)} />
                    <div className="flex items-center gap-2 text-sm">
                        <label htmlFor="sort" className="text-gray-600 dark:text-gray-400">Sort:</label>
                        <select id="sort" value={sort} onChange={e => setSort(e.target.value)} className="h-10 rounded-lg border border-gray-200 bg-white px-2 dark:border-white/10 dark:bg-[#2a2a2a]">
                            <option value="default">Featured</option>
                            <option value="low">Price: Low to High</option>
                            <option value="high">Price: High to Low</option>
                        </select>
                        <span className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-white/10 dark:text-gray-300">{visibleProducts.length} items</span>
                    </div>
                </div>
                <div className="flex flex-wrap gap-2">
                    {categories.map(item => (
                        <button
                            key={item}
                            type="button"
                            onClick={() => setCategory(item)}
                            className={`rounded-full px-3 py-1 text-sm capitalize ${category === item ? "bg-black text-white dark:bg-white dark:text-black" : "bg-gray-100 text-gray-700 hover:bg-gray-200 dark:bg-white/10 dark:text-gray-300"}`}
                        >
                            {item === "all" ? "All Items" : item}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-6">
                {loading ? (
                    <>
                        <p className="mb-4 text-sm text-gray-500">Loading products...</p>
                        <ProductSkeletonList />
                    </>
                ) : error ? (
                    <div className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-700 dark:border-red-900 dark:bg-red-950/40 dark:text-red-300">
                        <p className="font-semibold">Failed to load products</p>
                        <p className="mt-1 text-sm">{error} Please check your connection and refresh the page.</p>
                    </div>
                ) : (
                    <ProductList products={visibleProducts} onAdd={addToCart} />
                )}
            </div>
        </div>
    );
}
export default HomePage;
