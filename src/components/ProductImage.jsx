const PASTELS = [
  '#fce4d8',
  '#dcebf7',
  '#ddf0e4',
  '#fceec9',
  '#e4e4f2',
  '#f7e3ee',
  '#e3f2f0',
  '#f0efeb',
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
