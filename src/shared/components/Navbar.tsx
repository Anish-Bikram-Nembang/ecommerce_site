import { Handbag, Moon, ShoppingCart, Sun } from "lucide-react";
import { Link, NavLink } from "react-router";
import { useStore } from "../../store/useStore";
import { useTheme } from "../../theme/useTheme";

function navLinkClass({ isActive }: { isActive: boolean }) {
    return isActive
        ? "rounded-md bg-gray-100 px-3 py-1.5 font-medium text-black dark:bg-white/10 dark:text-white"
        : "px-3 py-1.5 text-gray-600 hover:text-black dark:text-gray-300 dark:hover:text-white";
}

function Navbar() {
    const { cartCount } = useStore();
    const { theme, toggleTheme } = useTheme();
    return (
        <header className="border-b border-gray-200 bg-white dark:border-white/10 dark:bg-[#171717]">
            <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 sm:px-6 lg:px-8">
                <Link to="/" className="flex items-center gap-2">
                    <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-black text-white dark:bg-white dark:text-black"><Handbag size={16} /></span>
                    <span className="text-lg font-semibold">Pasal</span>
                </Link>
                <nav className="ml-4 flex text-sm">
                    <NavLink to="/" end className={navLinkClass}>Shop</NavLink>
                    <NavLink to="/add-product" className={navLinkClass}>Add Product</NavLink>
                </nav>
                <div className="ml-auto flex items-center gap-1">
                    <button type="button" aria-label="Toggle dark mode" onClick={toggleTheme} className="rounded-full p-2 hover:bg-gray-100 dark:hover:bg-white/10">
                        {theme === "light" ? <Moon size={19} /> : <Sun size={19} />}
                    </button>
                    <Link to="/cart" aria-label="Shopping cart" className="relative rounded-full p-2 hover:bg-gray-100 dark:hover:bg-white/10">
                        <ShoppingCart size={20} />
                        {cartCount > 0 && (
                            <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-blue-600 px-1 text-[10px] font-bold text-white">
                                {cartCount}
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </header>
    );
}
export default Navbar;
