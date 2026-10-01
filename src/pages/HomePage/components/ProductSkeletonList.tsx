import ProductSkeleton from "./ProductSkeleton";

function ProductSkeletonList() {
    return (
        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
            {Array.from({ length: 8 }, (_, index) => <ProductSkeleton key={index} />)}
        </div>
    );
}

export default ProductSkeletonList;
