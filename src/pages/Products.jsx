import { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [priceRange, setPriceRange] = useState([0, 1000]); // [min, max]

  // Fetch products once
  useEffect(() => {
    fetch('https://fakestoreapi.com/products')
      .then((res) => res.json())
      .then((data) => {
        setAllProducts(data);
        setProducts(data);

        // Set initial price range based on data
        const prices = data.map(p => p.price);
        const min = Math.floor(Math.min(...prices));
        const max = Math.ceil(Math.max(...prices));
        setPriceRange([min, max]);

        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  // Extract unique categories
  const categories = useMemo(() => {
    const cats = [...new Set(allProducts.map((p) => p.category))];
    return ['all', ...cats.sort()];
  }, [allProducts]);

  // Get min/max prices for slider
  const { minPrice, maxPrice } = useMemo(() => {
    const prices = allProducts.map(p => p.price);
    return {
      minPrice: Math.floor(Math.min(...prices)),
      maxPrice: Math.ceil(Math.max(...prices))
    };
  }, [allProducts]);

  // Filter products
  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const matchesSearch = product.title.toLowerCase().includes(searchTerm.toLowerCase());
      const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
      const matchesPrice = product.price >= priceRange[0] && product.price <= priceRange[1];
      return matchesSearch && matchesCategory && matchesPrice;
    });
  }, [allProducts, searchTerm, selectedCategory, priceRange]);

  // Reset all filters
  const resetFilters = () => {
    setSearchTerm('');
    setSelectedCategory('all');
    setPriceRange([minPrice, maxPrice]);
  };

  // Handle price slider change
  const handlePriceChange = (e) => {
    const value = e.target.value;
    const min = Math.min(Number(value), priceRange[1] - 1);
    const max = Math.max(Number(value), priceRange[0] + 1);
    if (e.target.name === 'min') {
      setPriceRange([min, priceRange[1]]);
    } else {
      setPriceRange([priceRange[0], max]);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-emerald-500"></div>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-violet-600 mb-6">Our Products</h1>

      {/* Filters Bar */}
      <div className="mb-8 bg-white p-6 rounded-lg shadow-md space-y-4">
        {/* Search + Category */}
        <div className="flex flex-col sm:flex-row gap-4">
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 px-4 py-2 border border-sky-300 rounded-full focus:outline-none focus:ring-2 focus:ring-emerald-400 transition-all"
          />

          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="px-4 py-2 border border-emerald-300 rounded-full bg-white focus:outline-none focus:ring-2 focus:ring-violet-400 transition-all capitalize"
          >
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat === 'all' ? 'All Categories' : cat}
              </option>
            ))}
          </select>
        </div>

        {/* Price Range Slider */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm text-sky-700 font-medium">
            <span>Price: ${priceRange[0].toFixed(0)}</span>
            <span>${priceRange[1].toFixed(0)}</span>
          </div>

          <div className="relative">
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={priceRange[0]}
              onChange={(e) => setPriceRange([Number(e.target.value), priceRange[1]])}
              className="absolute w-full h-2 bg-gradient-to-r from-sky-200 to-emerald-200 rounded-lg appearance-none cursor-pointer slider-thumb"
              style={{
                zIndex: priceRange[0] > priceRange[1] - 10 ? 5 : 1
              }}
            />
            <input
              type="range"
              min={minPrice}
              max={maxPrice}
              value={priceRange[1]}
              onChange={(e) => setPriceRange([priceRange[0], Number(e.target.value)])}
              className="absolute w-full h-2 bg-gradient-to-r from-emerald-200 to-rose-200 rounded-lg appearance-none cursor-pointer slider-thumb"
            />
          </div>

          <style jsx>{`
            .slider-thumb::-webkit-slider-thumb {
              -webkit-appearance: none;
              appearance: none;
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: white;
              border: 3px solid #ec4899;
              cursor: pointer;
              box-shadow: 0 2px 6px rgba(0,0,0,0.2);
            }
            .slider-thumb::-moz-range-thumb {
              width: 20px;
              height: 20px;
              border-radius: 50%;
              background: white;
              border: 3px solid #ec4899;
              cursor: pointer;
              box-shadow: 0 2px 6px rgba(0,0,0,0.2);
            }
          `}</style>
        </div>

        {/* Clear Filters Button */}
        {(searchTerm || selectedCategory !== 'all' || priceRange[0] !== minPrice || priceRange[1] !== maxPrice) && (
          <button
            onClick={resetFilters}
            className="w-full sm:w-auto px-5 py-2 bg-rose-500 text-white rounded-full hover:bg-rose-600 transition-all font-medium shadow-md hover:shadow-lg"
          >
            Clear All Filters
          </button>
        )}
      </div>

      {/* Results Count */}
      <p className="text-sm text-sky-700 mb-4 font-medium">
        {filteredProducts.length} {filteredProducts.length === 1 ? 'product' : 'products'} found
      </p>

      {/* Product Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-xl text-rose-500 font-medium">No products match your filters.</p>
          <button
            onClick={resetFilters}
            className="mt-4 text-violet-600 underline hover:text-violet-800"
          >
            Clear filters and try again
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1"
            >
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-48 object-contain p-4 bg-gray-50"
              />
              <div className="p-4">
                <h2 className="text-lg font-semibold text-sky-700 line-clamp-2">{product.title}</h2>
                <p className="text-sm text-emerald-600 capitalize mt-1">{product.category}</p>
                <p className="text-xl font-bold text-rose-500 mt-2">${product.price.toFixed(2)}</p>
                <Link
                  to={`/products/${product.id}`}
                  className="mt-4 block text-center bg-violet-500 text-white py-2 rounded-md hover:bg-violet-600 transition-colors font-medium text-sm"
                >
                  View Details
                </Link>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Products;