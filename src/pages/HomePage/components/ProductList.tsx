import type { Product } from "../../../store/StoreContext";
import ProductCard from "./ProductCard";

interface ProductListProps {
    products: Product[];
    onAdd: (product: Product) => void;
}

function ProductList({ products, onAdd }: ProductListProps) {
    if (products.length === 0) {
        return <p className="rounded-xl bg-white p-8 text-center text-sm text-gray-500 dark:bg-[#1f1f1f] dark:text-gray-400">No products match your search.</p>;
    }
    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {products.map(product => (
                <ProductCard
                    key={product.id}
                    id={product.id}
                    name={product.title}
                    price={product.price}
                    image={product.image}
                    rating={product.rating}
                    category={product.category}
                    onAddToCart={() => onAdd(product)}
                />
            ))}
        </div>
    );
}
export default ProductList;
