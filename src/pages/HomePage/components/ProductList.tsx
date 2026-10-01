import type { IProduct } from "./Product";
import Product from "./Product";

function ProductList({ products, onAdd }: { products: IProduct[]; onAdd: (product: IProduct) => void }) {
    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {
                products.map(product => <Product key={product.id} product={product} onAdd={onAdd} />)
            }
        </div>

    );
}
export default ProductList;
