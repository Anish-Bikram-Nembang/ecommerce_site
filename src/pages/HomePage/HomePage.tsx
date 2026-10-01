import { useEffect, useMemo, useState } from "react";
import Searchbar from "./components/Searchbar";
import ProductList from "./components/ProductList";
import { useStore } from "../../store/useStore";
import ProductSkeletonList from "./components/ProductSkeletonList";

function HomePage() {
    const [search, setSearch] = useState("");
    const [sort, setSort] = useState("default");
    const { products, setProducts, addToCart } = useStore();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch("https://fakestoreapi.com/products");
                if (!response.ok) {
                    throw new Error("Failed to fetch products");
                }
                const data = await response.json();
                setProducts(current => current.length > 0 ? current : data);
            }
            catch (e) {
                setError(e instanceof Error ? e.message : "Unknown Error");
            }
            finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, [setProducts]);

    const visibleProducts = useMemo(() => {
        const filtered = products.filter(product => product.title.toLowerCase().includes(search.toLowerCase()));
        return [...filtered].sort((a, b) => sort === "low" ? a.price - b.price : sort === "high" ? b.price - a.price : 0);
    }, [products, search, sort]);

    if (loading) return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
            <section className="rounded-3xl bg-[#E8E6DF] px-6 py-10 dark:bg-[#33332d] sm:px-10 lg:px-16">
                <div className="h-3 w-32 rounded bg-black/10" />
                <div className="mt-4 h-12 max-w-xl rounded bg-black/10" />
                <div className="mt-4 h-4 max-w-md rounded bg-black/10" />
            </section>
            <div className="mt-10">
                <div className="mb-5 h-8 w-52 rounded bg-black/10 dark:bg-white/15" />
                <ProductSkeletonList />
            </div>
        </div>
    );
    if (error) return <p className="p-8 text-center text-red-700">{error}</p>;
    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
            <section className="rounded-3xl bg-[#E8E6DF] px-6 py-10 dark:bg-[#33332d] sm:px-10 lg:px-16">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-black/55 dark:text-white/65">Thoughtfully selected</p>
                <h1 className="mt-3 max-w-xl text-4xl font-semibold leading-tight tracking-tight sm:text-5xl">Good things for everyday living.</h1>
                <p className="mt-4 max-w-md text-sm leading-6 text-black/65 dark:text-white/75">Purposeful essentials, made to bring a little more ease to your daily routine.</p>
            </section>
            <section className="mt-10" id="featured">
                <div className="mb-5 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
                    <div><h2 className="text-2xl font-semibold">Discover products</h2><p className="text-sm text-black/60 dark:text-white/70">Find something useful for every corner of your home.</p></div>
                    <div className="flex w-full gap-2 sm:w-auto">
                        <Searchbar placeholder="Search essentials..." onChange={(e) => setSearch(e.target.value)} value={search} />
                        <select aria-label="Sort products" value={sort} onChange={e => setSort(e.target.value)} className="rounded-xl border border-black/10 bg-white px-3 text-sm outline-none dark:border-[#595959] dark:bg-[#3a3a3a] dark:text-white">
                            <option value="default">Sort</option><option value="low">Price: low-high</option><option value="high">Price: high-low</option>
                        </select>
                    </div>
                </div>
                <ProductList products={visibleProducts} onAdd={addToCart} />
            </section>
        </div>
    );
}
export default HomePage;
