import { ArrowLeft, Minus, Plus, Trash2 } from "lucide-react";
import { Link } from "react-router";
import { useStore } from "../../store/useStore";

function CartPage() {
    const { cart, cartCount, changeQuantity, removeFromCart } = useStore();
    const total = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);

    if (cart.length === 0) {
        return (
            <div className="mx-auto max-w-3xl px-4 py-16 text-center">
                <h1 className="text-3xl font-semibold">Your Cart</h1>
                <p className="mt-3 text-gray-600 dark:text-gray-400">Your cart is empty.</p>
                <Link to="/" className="mt-6 inline-block rounded-lg bg-black px-5 py-2.5 text-sm text-white hover:bg-gray-800 dark:bg-white dark:text-black">Continue Shopping</Link>
            </div>
        );
    }

    return (
        <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
                <h1 className="text-3xl font-semibold sm:text-4xl">Your Cart</h1>
                <span className="rounded-full bg-gray-200 px-3 py-1 text-sm dark:bg-white/10">{cartCount} {cartCount === 1 ? "item" : "items"}</span>
            </div>

            <div className="mt-6 grid gap-6 lg:grid-cols-3">
                <div className="space-y-4 lg:col-span-2">
                    {cart.map(({ product, quantity }) => (
                        <div key={product.id} className="flex gap-4 rounded-xl border border-gray-200 bg-white p-4 dark:border-white/10 dark:bg-[#1f1f1f]">
                            <Link to={`/product/${product.id}`} className="flex h-24 w-24 shrink-0 items-center justify-center rounded-lg bg-white p-2">
                                <img src={product.image} alt={product.title} className="h-full w-full object-contain" />
                            </Link>
                            <div className="flex flex-1 flex-col">
                                <div className="flex justify-between gap-4">
                                    <div>
                                        <p className="text-xs font-semibold uppercase text-gray-500">{product.category}</p>
                                        <Link to={`/product/${product.id}`} className="line-clamp-2 font-medium hover:underline">{product.title}</Link>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-semibold">${(product.price * quantity).toFixed(2)}</p>
                                        {quantity > 1 && <p className="text-xs text-gray-500">(${product.price.toFixed(2)} each)</p>}
                                    </div>
                                </div>
                                <div className="mt-auto flex items-center justify-between pt-3">
                                    <div className="flex items-center rounded-lg border border-gray-200 dark:border-white/10">
                                        <button type="button" aria-label="Decrease quantity" onClick={() => changeQuantity(product.id, -1)} disabled={quantity === 1} className="p-2 disabled:opacity-40"><Minus size={14} /></button>
                                        <span className="w-8 text-center text-sm">{quantity}</span>
                                        <button type="button" aria-label="Increase quantity" onClick={() => changeQuantity(product.id, 1)} className="p-2"><Plus size={14} /></button>
                                    </div>
                                    <button type="button" onClick={() => removeFromCart(product.id)} className="flex items-center gap-1 text-sm text-gray-500 hover:text-red-600">
                                        <Trash2 size={15} /> Remove
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                    <Link to="/" className="inline-flex items-center gap-1 text-sm text-gray-600 hover:text-black dark:text-gray-400 dark:hover:text-white">
                        <ArrowLeft size={16} /> Continue Shopping
                    </Link>
                </div>

                <div className="h-fit rounded-xl border border-gray-200 bg-white p-6 dark:border-white/10 dark:bg-[#1f1f1f]">
                    <h2 className="text-xl font-semibold">Order Summary</h2>
                    <div className="mt-4 space-y-2 text-sm">
                        <div className="flex justify-between"><span>Subtotal</span><span>${total.toFixed(2)}</span></div>
                        <div className="flex justify-between"><span>Shipping</span><span className="text-green-600">Free</span></div>
                    </div>
                    <div className="mt-4 flex justify-between border-t border-gray-200 pt-4 text-lg font-semibold dark:border-white/10">
                        <span>Total</span><span>${total.toFixed(2)}</span>
                    </div>
                    <button type="button" onClick={() => alert("Checkout is not part of this assignment.")} className="mt-6 w-full rounded-lg bg-black py-3 text-sm text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">
                        Proceed to Checkout
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CartPage;
