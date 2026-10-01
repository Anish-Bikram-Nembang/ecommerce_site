import { Search } from "lucide-react";
import type { ChangeEvent } from "react";

interface SearchbarProps {
    onChange: (e: ChangeEvent<HTMLInputElement>) => void;
    placeholder: string;
    value: string;
}

function Searchbar({ onChange, placeholder, value }: SearchbarProps) {
    return (
        <div className="flex h-10 w-full items-center gap-2 rounded-lg bg-gray-100 px-3 sm:max-w-xs dark:bg-white/10">
            <Search size={17} className="text-gray-500" />
            <input aria-label="Search products" className="w-full bg-transparent text-sm outline-none placeholder:text-gray-500" onChange={onChange} value={value} placeholder={placeholder} />
        </div>
    );
}
export default Searchbar;
