import { Link } from 'react-router'

function Footer() {
  return (
    <footer className="site-footer">
      <div className="footer-inner">
        <div>
          <Link to="/" className="f-logo">
            Shop<span>Kart</span>
          </Link>
          <p className="f-note">
            Frontend training project built with React + Redux Toolkit.
          </p>
        </div>
       
        <p className="f-data">Product data: fakestoreapi.com</p>
      </div>
    </footer>
  )
}

export default Footer
