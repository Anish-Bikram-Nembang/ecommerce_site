import { createContext, useState, type Dispatch, type ReactNode, type SetStateAction } from "react";

export interface Product {
    id: number;
    title: string;
    price: number;
    image: string;
    category: string;
    description?: string;
    rating?: { rate: number; count: number };
}

export interface CartItem {
    product: Product;
    quantity: number;
}

interface Store {
    products: Product[];
    setProducts: Dispatch<SetStateAction<Product[]>>;
    addProduct: (product: Omit<Product, "id">) => void;
    cart: CartItem[];
    cartCount: number;
    addToCart: (product: Product) => void;
    changeQuantity: (id: number, amount: number) => void;
    removeFromCart: (id: number) => void;
}

const StoreContext = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [cart, setCart] = useState<CartItem[]>([]);

    // total number of items, used for the badge in the navbar
    const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

    function addProduct(product: Omit<Product, "id">) {
        // new products go to the top of the list
        setProducts(current => [{ ...product, id: Date.now() }, ...current]);
    }

    function addToCart(product: Product) {
        setCart(current => {
            const existing = current.find(item => item.product.id === product.id);
            if (existing) {
                return current.map(item => item.product.id === product.id ? { ...item, quantity: item.quantity + 1 } : item);
            }
            return [...current, { product, quantity: 1 }];
        });
    }

    // amount is +1 or -1, quantity never goes below 1 (use remove for that)
    function changeQuantity(id: number, amount: number) {
        setCart(current => current.map(item => item.product.id === id ? { ...item, quantity: Math.max(1, item.quantity + amount) } : item));
    }

    function removeFromCart(id: number) {
        setCart(current => current.filter(item => item.product.id !== id));
    }

    return (
        <StoreContext.Provider value={{ products, setProducts, addProduct, cart, cartCount, addToCart, changeQuantity, removeFromCart }}>
            {children}
        </StoreContext.Provider>
    );
}

export { StoreContext };
