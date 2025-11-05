import { useCart } from '../context/CartContext.jsx';

const Cart = () => {
  const { cart, removeFromCart, updateQuantity, totalPrice } = useCart();

  if (cart.length === 0) {
    return <p className="text-center text-violet-600 text-xl">Your cart is empty.</p>;
  }

  return (
    <div>
      <h1 className="text-3xl font-bold text-emerald-600 mb-8">Your Cart</h1>
      <div className="overflow-x-auto">
        <table className="w-full bg-white shadow-md rounded-lg">
          <thead className="bg-sky-100">
            <tr>
              <th className="p-4 text-left">Product</th>
              <th className="p-4 text-left">Price</th>
              <th className="p-4 text-left">Quantity</th>
              <th className="p-4 text-left">Subtotal</th>
              <th className="p-4"></th>
            </tr>
          </thead>
          <tbody>
            {cart.map((item) => (
              <tr key={item.id} className="border-b">
                <td className="p-4 flex items-center">
                  <img src={item.image} alt={item.title} className="w-16 h-16 object-contain mr-4" />
                  <span className="text-sky-700">{item.title}</span>
                </td>
                <td className="p-4 text-rose-500">${item.price.toFixed(2)}</td>
                <td className="p-4">
                  <input
                    type="number"
                    value={item.quantity}
                    onChange={(e) => updateQuantity(item.id, parseInt(e.target.value))}
                    className="w-16 border rounded px-2 py-1"
                    min="1"
                  />
                </td>
                <td className="p-4 text-violet-600">${(item.price * item.quantity).toFixed(2)}</td>
                <td className="p-4">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="text-rose-500 hover:text-rose-700 transition-colors"
                  >
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="mt-8 text-right">
        <h2 className="text-2xl font-bold text-emerald-600">Total: ${totalPrice.toFixed(2)}</h2>
      </div>
    </div>
  );
};

export default Cart;