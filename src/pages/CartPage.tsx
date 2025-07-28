import { useState, useEffect } from "react";
import { useCart } from "@/context/cart-context";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import axios from "axios";
import { useAuth } from "@/lib/auth-context";

const CART_BG = 'https://t3.ftcdn.net/jpg/02/36/78/56/360_F_236785686_7vT8LpkAqE8TY36Qt7ToKj0HUYZ7y65v.jpg';

const CartPage = () => {
  const { cart, getTotalItems, getTotalPrice, clearCart } = useCart();
  const { user } = useAuth();
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", location: "" });
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({ ...prev, name: user.name, email: user.email }));
    }
  }, [user]);

  const handlePayNow = () => setShowForm(true);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/place-order", {
        name: user ? user.name : formData.name,
        email: user ? user.email : formData.email,
        location: formData.location,
        cartItems: cart,
        totalPrice: getTotalPrice(),
      });

      if (response.status === 201) {
        setOrderPlaced(true);
        setShowForm(false);

        setTimeout(() => {
          clearCart();
          setOrderPlaced(false);
        }, 2000);
      }
    } catch (err) {
      console.error("Order failed:", err);
    }
  };

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat py-12 px-2 md:px-0"
      style={{ backgroundImage: `url('${CART_BG}')` }}
    >
      <div className="max-w-2xl mx-auto bg-white/90 rounded-2xl shadow-2xl p-8 backdrop-blur-md">
        {!orderPlaced && (
          <>
            <h2 className="text-3xl font-extrabold text-agrogreen-700 mb-6 text-center drop-shadow-lg">🛒 Your Cart ({getTotalItems()} items)</h2>
            {cart.length === 0 ? (
              <div className="text-center text-gray-500">Your cart is empty.</div>
            ) : (
              <>
                {cart.map((item) => (
                  <div
                    key={item.productId}
                    className="flex items-center gap-4 mb-4 bg-gradient-to-br from-green-50 to-white border border-agrogreen-100 p-4 rounded-xl shadow"
                  >
                    <img
                      src={item.product.image}
                      alt={item.product.name}
                      className="w-16 h-16 object-cover rounded shadow"
                    />
                    <div className="flex-1">
                      <p className="font-semibold text-lg text-agrogreen-800">{item.product.name}</p>
                      <p className="text-gray-700">₹{item.product.price} x {item.quantity}</p>
                    </div>
                  </div>
                ))}
                <div className="font-bold text-right mb-4 text-xl text-agrogreen-700">Total: ₹{getTotalPrice()}</div>
                {!showForm && (
                  <Button className="w-full bg-agrogreen-600 hover:bg-agrogreen-700 text-white font-bold py-3 rounded" onClick={handlePayNow}>Pay Now</Button>
                )}
                {showForm && (
                  <div className="mt-4 space-y-4">
                    <Input name="name" placeholder="Name" value={formData.name} readOnly={!!user} onChange={handleInputChange} className="p-3 rounded border border-agrogreen-200 focus:outline-agrogreen-400" />
                    <Input name="email" placeholder="Email" value={formData.email} readOnly={!!user} onChange={handleInputChange} className="p-3 rounded border border-agrogreen-200 focus:outline-agrogreen-400" />
                    <Input name="location" placeholder="Location" value={formData.location} onChange={handleInputChange} className="p-3 rounded border border-agrogreen-200 focus:outline-agrogreen-400" />
                    <Button className="w-full bg-agrogreen-600 hover:bg-agrogreen-700 text-white font-bold py-3 rounded" onClick={handlePlaceOrder}>Pay</Button>
                  </div>
                )}
              </>
            )}
          </>
        )}
        {orderPlaced && (
          <div className="mt-6 text-green-700 font-extrabold text-center text-2xl bg-green-50 rounded-xl p-6 shadow">
            ✅ Your order has been placed!
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;
