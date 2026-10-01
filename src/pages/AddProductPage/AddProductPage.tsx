import { useState, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { useStore } from "../../store/useStore";

function AddProductPage() {
    const { addProduct } = useStore();
    const navigate = useNavigate();
    const [form, setForm] = useState({ title: "", price: "", image: "", category: "general" });
    const [error, setError] = useState("");
    function submit(event: FormEvent) {
        event.preventDefault();
        if (!form.title.trim()) return setError("Product name is required.");
        if (!Number(form.price) || Number(form.price) <= 0) return setError("Price must be a positive number.");
        try { new URL(form.image); } catch { return setError("Enter a valid image URL."); }
        addProduct({ title: form.title, price: Number(form.price), image: form.image, category: form.category });
        navigate("/");
    }
    return <form onSubmit={submit} className="mx-auto max-w-xl px-4 py-10 sm:px-6">
        <h1 className="text-3xl font-semibold">Add a product</h1>
        <div className="mt-6 space-y-4">{[["title", "Product name"], ["price", "Price"], ["image", "Image URL"]].map(([key, label]) => <label className="block text-sm font-medium" key={key}>{label}<input type={key === "price" ? "number" : "text"} value={form[key as keyof typeof form]} onChange={e => setForm({ ...form, [key]: e.target.value })} className="mt-1 block w-full rounded-xl border border-black/15 bg-white px-3 py-3 outline-none dark:border-[#595959] dark:bg-[#3a3a3a] dark:text-white" /></label>)}
            <label className="block text-sm font-medium">Category<select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })} className="mt-1 block w-full rounded-xl border border-black/15 bg-white px-3 py-3 dark:border-[#595959] dark:bg-[#3a3a3a] dark:text-white"><option>general</option><option>clothing</option><option>electronics</option><option>home</option></select></label>
        </div>
        {error && <p className="mt-3 text-sm text-red-700">{error}</p>}<button className="mt-6 rounded-full bg-black px-5 py-3 text-sm text-white">Save product</button>
    </form>
}

export default AddProductPage;
