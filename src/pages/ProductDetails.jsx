import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCart } from '../context/CartContext.jsx';

const ProductDetails = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useCart();

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setProduct(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, [id]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-emerald-500"></div>
      </div>
    );
  }

  if (!product) return <p className="text-center text-rose-500">Product not found.</p>;

  return (
    <div className="flex flex-col md:flex-row gap-8 bg-white p-8 rounded-lg shadow-md">
      <img src={product.image} alt={product.title} className="w-full md:w-1/2 h-96 object-contain" />
      <div className="flex-1">
        <h1 className="text-3xl font-bold text-violet-600 mb-4">{product.title}</h1>
        <p className="text-lg text-sky-700 mb-4">{product.description}</p>
        <p className="text-2xl font-bold text-rose-500 mb-6">${product.price.toFixed(2)}</p>
        <button
          onClick={() => addToCart(product)}
          className="bg-emerald-500 text-white px-6 py-3 rounded-full font-semibold hover:bg-emerald-600 transition-all duration-300 shadow-md hover:shadow-lg"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
};

export default ProductDetails;