const PASTELS = [
  '#f8e7d2',
  '#e8efe2',
  '#f4ead9',
  '#e9eee6',
  '#f6e9dc',
  '#eaf0ea',
  '#f3ecdf',
  '#efeae0',
]

function ProductImage({ product, className = '' }) {
  const bg = PASTELS[product.id % PASTELS.length]
  return (
    <div className={`product-image ${className}`} style={{ background: bg }}>
      <img src={product.image} alt={product.title} loading="lazy" />
    </div>
  )
}

export default ProductImage
