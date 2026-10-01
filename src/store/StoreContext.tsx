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

interface Store {
    products: Product[];
    setProducts: Dispatch<SetStateAction<Product[]>>;
    addProduct: (product: Omit<Product, "id">) => void;
    cart: Product[];
    addToCart: (product: Product) => void;
}

const StoreContext = createContext<Store | null>(null);

export function StoreProvider({ children }: { children: ReactNode }) {
    const [products, setProducts] = useState<Product[]>([]);
    const [cart, setCart] = useState<Product[]>([]);

    function addProduct(product: Omit<Product, "id">) {
        setProducts(current => [{ ...product, id: Date.now() }, ...current]);
    }

    function addToCart(product: Product) {
        setCart(current => [...current, product]);
    }

    return <StoreContext.Provider value={{ products, setProducts, addProduct, cart, addToCart }}>{children}</StoreContext.Provider>;
}

export { StoreContext };
