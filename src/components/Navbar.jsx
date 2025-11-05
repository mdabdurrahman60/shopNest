import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

const Navbar = () => {
  const { cart } = useCart();
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-gradient-to-r from-sky-500 to-emerald-500 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-white text-2xl font-bold tracking-wide hover:text-rose-100 transition-colors">
          ShopNest
        </Link>
        <div className="space-x-6">
          <Link to="/" className="text-white hover:text-violet-200 transition-colors font-medium">
            Home
          </Link>
          <Link to="/products" className="text-white hover:text-violet-200 transition-colors font-medium">
            Products
          </Link>
          <Link to="/cart" className="text-white hover:text-violet-200 transition-colors font-medium relative">
            Cart
            {cartCount > 0 && (
              <span className="absolute -top-2 -right-4 bg-rose-500 text-white text-xs rounded-full px-2 py-1">
                {cartCount}
              </span>
            )}
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;