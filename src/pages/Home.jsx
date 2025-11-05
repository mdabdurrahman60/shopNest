import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="relative overflow-hidden">
      {/* Full-width Video Section */}
      <div className="relative h-100 w-full flex items-center justify-center bg-gradient-to-br from-violet-100 via-sky-100 to-emerald-100">
        {/* Replace with your actual video URL */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover opacity-10"
        >
          <source src="/videos/shopnest-promo.mp4" type="video/mp4" />
          {/* Fallback if video fails to load */}
          <div className="absolute inset-0 bg-gradient-to-br from-violet-500 to-emerald-500 opacity-80" />
        </video>

        {/* Overlay Content */}
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold text-white drop-shadow-2xl mb-6 animate-fade-in">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 to-emerald-400"> Welcome to ShopNest</span>
          </h1>
          <p className="text-xl md:text-2xl text-black drop-shadow-lg mb-8">
            Discover amazing products in a colorful shopping experience!
          </p> 
        </div>
       

        {/* Subtle scroll indicator */}
        <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>

      {/* Shop Now CTA Section (Below Video) */}
      <div className="py-20 bg-gradient-to-t from-rose-50 to-transparent text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-violet-700 mb-6">
          Ready to Explore?
        </h2>
        <p className="text-lg text-sky-700 mb-10 max-w-2xl mx-auto">
          Browse thousands of products with smart filters, fast cart, and a delightful experience.
        </p>
        <Link
          to="/products"
          className="inline-block bg-gradient-to-r from-emerald-500 to-rose-500 text-white px-10 py-4 rounded-full font-bold text-xl shadow-lg hover:shadow-2xl transform hover:scale-105 transition-all duration-300"
        >
          Shop Now
        </Link>
      </div>

      {/* Optional: Add custom styles */}
      <style jsx>{`
        @keyframes fade-in {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in {
          animation: fade-in 1s ease-out;
        }
      `}</style>
    </div>
  );
};

export default Home;