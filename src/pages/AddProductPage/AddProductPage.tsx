import { useState, type ChangeEvent, type FormEvent } from "react";
import { useNavigate } from "react-router";
import { useStore } from "../../store/useStore";

const CATEGORIES = ["electronics", "jewelery", "men's clothing", "women's clothing"];

// must start with http:// or https:// and have a dot in the domain
const URL_PATTERN = /^https?:\/\/[^\s/$.?#][^\s]*\.[^\s]+$/i;

interface FormValues {
    name: string;
    price: string;
    image: string;
    category: string;
}

type FormErrors = Partial<Record<keyof FormValues, string>>;

const emptyForm: FormValues = { name: "", price: "", image: "", category: CATEGORIES[0] };

function validate(values: FormValues) {
    const errors: FormErrors = {};
    if (!values.name.trim()) errors.name = "Product name is required.";
    if (!values.price.trim()) errors.price = "Price is required.";
    else if (isNaN(Number(values.price)) || Number(values.price) <= 0) errors.price = "Price must be a positive number.";
    if (!URL_PATTERN.test(values.image.trim())) errors.image = "Enter a valid image URL (starting with http:// or https://).";
    return errors;
}

function AddProductPage() {
    const { addProduct } = useStore();
    const navigate = useNavigate();
    const [form, setForm] = useState<FormValues>(emptyForm);
    const [errors, setErrors] = useState<FormErrors>({});

    function handleChange(e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = e.target;
        setForm(current => ({ ...current, [name]: value }));
        // remove the error for this field once the user starts fixing it
        setErrors(current => ({ ...current, [name]: undefined }));
    }

    function handleSubmit(e: FormEvent) {
        e.preventDefault();
        const newErrors = validate(form);
        setErrors(newErrors);
        if (Object.keys(newErrors).length > 0) return;

        addProduct({ title: form.name.trim(), price: Number(form.price), image: form.image.trim(), category: form.category });
        navigate("/");
    }

    function inputClass(field: keyof FormValues) {
        return `mt-1 block w-full rounded-lg border bg-white px-3 py-2.5 text-sm outline-none focus:ring-2 dark:bg-[#2a2a2a] ${errors[field] ? "border-red-500 focus:ring-red-200" : "border-gray-200 focus:ring-gray-300 dark:border-white/10"}`;
    }

    const previewPrice = Number(form.price) > 0 ? Number(form.price).toFixed(2) : "0.00";

    return (
        <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6">
            <h1 className="text-3xl font-semibold sm:text-4xl">Add New Product</h1>
            <p className="mt-1 text-gray-600 dark:text-gray-400">Fill in the form to add a product to the top of the shop.</p>

            <div className="mt-6 grid gap-6 md:grid-cols-5">
                <form onSubmit={handleSubmit} noValidate className="space-y-5 rounded-xl border border-gray-200 bg-white p-6 md:col-span-3 dark:border-white/10 dark:bg-[#1f1f1f]">
                    <div>
                        <label htmlFor="name" className="text-sm font-medium">Product Name <span className="text-red-500">*</span></label>
                        <input id="name" name="name" type="text" value={form.name} onChange={handleChange} placeholder="e.g. Cotton T-Shirt" className={inputClass("name")} />
                        {errors.name && <p className="mt-1 text-xs text-red-600">{errors.name}</p>}
                    </div>

                    <div className="grid gap-5 sm:grid-cols-2">
                        <div>
                            <label htmlFor="price" className="text-sm font-medium">Price ($) <span className="text-red-500">*</span></label>
                            <input id="price" name="price" type="number" step="0.01" value={form.price} onChange={handleChange} placeholder="0.00" className={inputClass("price")} />
                            {errors.price && <p className="mt-1 text-xs text-red-600">{errors.price}</p>}
                        </div>
                        <div>
                            <label htmlFor="category" className="text-sm font-medium">Category <span className="text-red-500">*</span></label>
                            <select id="category" name="category" value={form.category} onChange={handleChange} className={`${inputClass("category")} capitalize`}>
                                {CATEGORIES.map(category => <option key={category} value={category}>{category}</option>)}
                            </select>
                        </div>
                    </div>

                    <div>
                        <label htmlFor="image" className="text-sm font-medium">Image URL <span className="text-red-500">*</span></label>
                        <input id="image" name="image" type="url" value={form.image} onChange={handleChange} placeholder="https://example.com/image.jpg" className={inputClass("image")} />
                        {errors.image && <p className="mt-1 text-xs text-red-600">{errors.image}</p>}
                    </div>

                    <div className="flex gap-3">
                        <button type="submit" className="rounded-lg bg-black px-5 py-2.5 text-sm text-white hover:bg-gray-800 dark:bg-white dark:text-black dark:hover:bg-gray-200">Add Product</button>
                        <button type="button" onClick={() => { setForm(emptyForm); setErrors({}); }} className="rounded-lg px-4 py-2.5 text-sm text-gray-600 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-white/10">Clear Form</button>
                    </div>
                </form>

                <div className="md:col-span-2">
                    <p className="mb-2 text-sm font-medium text-gray-600 dark:text-gray-400">Preview</p>
                    <div className="rounded-xl border border-gray-200 bg-white p-3 dark:border-white/10 dark:bg-[#1f1f1f]">
                        <div className="flex aspect-square items-center justify-center rounded-lg bg-gray-50 p-4 text-sm text-gray-400">
                            {URL_PATTERN.test(form.image.trim()) ? <img src={form.image} alt="Preview" className="h-full w-full object-contain" /> : "No image yet"}
                        </div>
                        <p className="mt-3 text-xs capitalize text-gray-500">{form.category}</p>
                        <p className="font-semibold">{form.name || "Product name"}</p>
                        <p className="mt-1 text-lg font-bold">${previewPrice}</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddProductPage;
