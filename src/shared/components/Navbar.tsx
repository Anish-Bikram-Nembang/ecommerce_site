import { Handbag, Moon, ShoppingCart, Sun } from "lucide-react";
import { Link } from "react-router";
import { useStore } from "../../store/useStore";
import { useTheme } from "../../theme/useTheme";

function Navbar() {
    const { cart } = useStore();
    const { theme, toggleTheme } = useTheme();
    return (
        <header className="border-b border-black/10 bg-white dark:border-white/10 dark:bg-[#171717] dark:text-white">
            <div className="mx-auto flex h-[68px] max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
            <Link to="/" className="flex items-center gap-2">
                <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-black text-white"><Handbag size={18} /></span>
                <div>
                    <h3 className="leading-none font-semibold">Pasal</h3>
                    <p className="text-[11px] text-black/55">everyday essentials</p>
                </div>
            </Link>
            <nav className="ml-auto hidden gap-6 pr-4 text-sm text-black/65 dark:text-white/65 sm:flex">
                <Link to="/">Shop</Link>
                <Link to="/add-product">Add product</Link>
            </nav>
            <button type="button" aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`} onClick={toggleTheme} className="rounded-full p-2 hover:bg-black/5 dark:hover:bg-white/10">
                {theme === "light" ? <Moon size={19} /> : <Sun size={19} />}
            </button>
            <Link to="/cart" aria-label="Shopping cart" className="relative rounded-full p-2 hover:bg-black/5 dark:hover:bg-white/10">
                <ShoppingCart size={20} />
                {cart.length > 0 && <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-black px-1 text-[10px] text-white">{cart.length}</span>}
            </Link>
            </div>
        </header>
    );
}
export default Navbar;
