import { Link } from "react-router";
import { useStore } from "../../store/useStore";

function CartPage() {
    const { cart } = useStore();
    return <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-semibold">Your cart</h1>
        {cart.length === 0 ? <p className="mt-4 text-black/60">Your cart is empty. <Link className="underline" to="/">Continue shopping</Link></p> :
            <div className="mt-6 space-y-3">{cart.map((product, index) => <div className="flex items-center gap-4 rounded-2xl border border-transparent bg-white p-3 dark:border-[#4b4b4b] dark:bg-[#292929]" key={`${product.id}-${index}`}>
                <img src={product.image} alt="" className="h-16 w-16 rounded-xl bg-[#F4F5F6] object-contain p-2 dark:bg-[#292929]" />
                <p className="flex-1 text-sm font-medium">{product.title}</p><strong>NPR {product.price.toFixed(2)}</strong>
            </div>)}</div>}
    </div>
}

export default CartPage;
