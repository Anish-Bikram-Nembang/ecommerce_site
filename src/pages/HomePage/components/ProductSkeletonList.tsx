import ProductSkeleton from "./ProductSkeleton";

function ProductSkeletonList() {
    return (
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
            {Array.from({ length: 10 }, (_, index) => <ProductSkeleton key={index} />)}
        </div>
    );
}

export default ProductSkeletonList;
