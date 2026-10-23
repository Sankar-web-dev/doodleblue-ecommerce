import { Link } from 'react-router'

function NotFoundPage() {
  return (
    <main className="page">
      <div className="card empty-cart">
        <h2>Page not found</h2>
        <p>The page you're looking for doesn't exist.</p>
        <Link to="/" className="btn btn-primary">
          Back to products
        </Link>
      </div>
    </main>
  )
}

export default NotFoundPage
