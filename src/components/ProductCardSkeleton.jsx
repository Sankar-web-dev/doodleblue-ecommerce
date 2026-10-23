function ProductCardSkeleton() {
  return (
    <div className="card product-card skeleton-card" aria-hidden="true">
      <div className="sk sk-img" />
      <div className="sk sk-line w-40" />
      <div className="sk sk-line w-80" />
      <div className="sk sk-line w-50" />
      <div className="sk-foot">
        <div className="sk sk-line w-30" />
        <div className="sk sk-btn" />
      </div>
    </div>
  )
}

export default ProductCardSkeleton
