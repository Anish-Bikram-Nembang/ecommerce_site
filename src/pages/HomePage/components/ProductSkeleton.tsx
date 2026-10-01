function ProductSkeleton() {
    return (
        <div aria-hidden="true" className="animate-pulse rounded-xl border border-gray-200 bg-white p-3 dark:border-white/10 dark:bg-[#1f1f1f]">
            <div className="aspect-square rounded-lg bg-gray-200 dark:bg-white/10" />
            <div className="space-y-2 pt-3">
                <div className="h-3 w-1/4 rounded bg-gray-200 dark:bg-white/10" />
                <div className="h-4 w-4/5 rounded bg-gray-200 dark:bg-white/10" />
                <div className="h-5 w-1/3 rounded bg-gray-200 dark:bg-white/10" />
                <div className="h-9 rounded-lg bg-gray-200 dark:bg-white/10" />
            </div>
        </div>
    );
}

export default ProductSkeleton;
