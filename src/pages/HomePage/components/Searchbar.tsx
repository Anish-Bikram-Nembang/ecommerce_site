import { Search } from "lucide-react";
import type { ChangeEvent } from "react";

interface SearchbarProps {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    value: string;
}

function Searchbar({ onChange, placeholder, value }: SearchbarProps) {
    return (
        <div className="flex h-12 items-center gap-2 rounded-xl border border-black/10 bg-white px-3 dark:border-[#595959] dark:bg-[#3a3a3a]">
            <Search size={19} className="text-black/50 dark:text-white/50" />
            <input aria-label="Search products" className="w-full bg-transparent text-sm outline-none placeholder:text-black/45 dark:text-white dark:placeholder:text-white/45" onChange={onChange} value={value} placeholder={placeholder} />
        </div>
    )

}
export default Searchbar;
