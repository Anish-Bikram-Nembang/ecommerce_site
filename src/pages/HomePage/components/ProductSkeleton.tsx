function ProductSkeleton() {
    return (
        <div aria-hidden="true" className="rounded-2xl border border-black/5 bg-white p-3 shadow-sm dark:border-[#4b4b4b] dark:bg-[#292929]">
            <div className="aspect-square rounded-xl bg-black/10" />
            <div className="space-y-3 pt-3">
                <div className="h-4 w-4/5 rounded bg-black/10" />
                <div className="flex items-center justify-between">
                    <div className="h-4 w-1/3 rounded bg-black/10" />
                    <div className="h-7 w-14 rounded-lg bg-black/10" />
                </div>
            </div>
        </div>
    );
}

export default ProductSkeleton;
