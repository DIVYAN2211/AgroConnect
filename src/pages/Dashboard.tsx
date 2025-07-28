import { useAuth } from '@/lib/auth-context';
import { useCart } from '@/context/cart-context';
import { useEffect, useState } from 'react';
import { fetchPosts } from '@/lib/api';
import axios from 'axios';

const DASHBOARD_BG = 'https://media.istockphoto.com/id/692641848/photo/blurred-sky-grass-horizontal-background.jpg?s=612x612&w=0&k=20&c=Uydw9iNFWAf9bd0aokEKxhOh9m8uCZHbRjp5Bveo9f8=';

const Dashboard = () => {
  const { user } = useAuth();
  const { cart } = useCart();
  const [posts, setPosts] = useState([]);
  const [userPosts, setUserPosts] = useState([]);
  const [userComments, setUserComments] = useState([]);
  const [orders, setOrders] = useState([]);
  const [ordersFetched, setOrdersFetched] = useState(false);

  useEffect(() => {
    const loadPosts = async () => {
      const res = await fetchPosts();
      setPosts(res.data);
    };
    loadPosts();
  }, []);

  useEffect(() => {
    if (user && posts.length > 0) {
      setUserPosts(posts.filter((p: any) => p.username === user.name));
      const comments: any[] = [];
      posts.forEach((p: any) => {
        p.comments.forEach((c: any) => {
          if (c.username === user.name) {
            comments.push({ ...c, postId: p._id, postText: p.text });
          }
        });
      });
      setUserComments(comments);
    }
  }, [user, posts]);

  useEffect(() => {
    const fetchOrders = async () => {
      if (!user) return;
      try {
        const res = await axios.get('http://localhost:5000/api/orders');
        // Case-insensitive, trimmed filter
        const filtered = res.data.filter((order: any) =>
          order.email && user.email &&
          order.email.trim().toLowerCase() === user.email.trim().toLowerCase()
        );
        setOrders(filtered.slice(0, 3)); // Only top 3 recent orders
        setOrdersFetched(true);
      } catch (err) {
        setOrders([]);
        setOrdersFetched(true);
      }
    };
    fetchOrders();
  }, [user]);

  return (
    <div
      className="min-h-screen w-full bg-cover bg-center bg-no-repeat py-12 px-2 md:px-0"
      style={{ backgroundImage: `url('${DASHBOARD_BG}')` }}
    >
      <div className="max-w-5xl mx-auto bg-white/80 rounded-2xl shadow-2xl p-8 backdrop-blur-md">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8 gap-4">
          <div>
            <h1 className="text-4xl font-extrabold text-agrogreen-700 mb-1">Welcome, {user?.name}!</h1>
            <p className="text-gray-700 text-lg">Here's your personalized agri dashboard.</p>
          </div>
          <div className="flex flex-col md:items-end">
            <span className="text-sm text-gray-500">Email: {user?.email}</span>
            
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Order History */}
          <div className="bg-white rounded-xl shadow p-6 border border-agrogreen-100">
            <h2 className="text-xl font-bold text-agrogreen-700 mb-2 flex items-center gap-2">
              <span>🧾</span> Recent Orders
            </h2>
            {!ordersFetched ? (
              <p className="text-gray-500">Loading orders...</p>
            ) : orders.length === 0 ? (
              <p className="text-gray-500">No orders found for your account.<br/>If you just placed an order, try refreshing the page.</p>
            ) : (
              <ul className="space-y-4">
                {orders.map((order: any) => (
                  <li key={order._id} className="border-b pb-2">
                    <div className="font-semibold text-agrogreen-800">Order placed on {new Date(order.createdAt).toLocaleString()}</div>
                    <div className="text-xs text-gray-500">Location: {order.location}</div>
                    <div className="text-xs text-gray-500">Total: <span className="font-bold">₹{order.totalPrice}</span></div>
                    <ul className="ml-4 text-sm list-disc">
                      {order.cartItems.map((item: any, idx: number) => (
                        <li key={idx}>{item.product.name} × {item.quantity}</li>
                      ))}
                    </ul>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* Cart Items */}
          <div className="bg-white rounded-xl shadow p-6 border border-agrogreen-100">
            <h2 className="text-xl font-bold text-agrogreen-700 mb-2 flex items-center gap-2">
              <span>🛒</span> Cart Items
            </h2>
            {cart.length === 0 ? (
              <p className="text-gray-500">Your cart is empty.</p>
            ) : (
              <ul className="space-y-2">
                {cart.map((item: any) => (
                  <li key={item.productId} className="flex items-center gap-2">
                    <img src={item.product.image} alt={item.product.name} className="w-10 h-10 object-cover rounded" />
                    <span>{item.product.name} × {item.quantity}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* User's Posts */}
          <div className="bg-white rounded-xl shadow p-6 border border-agrogreen-100 md:col-span-2">
            <h2 className="text-xl font-bold text-agrogreen-700 mb-2 flex items-center gap-2">
              <span>📝</span> Your Posts
            </h2>
            {userPosts.length === 0 ? (
              <p className="text-gray-500">You haven't posted anything yet.</p>
            ) : (
              <ul className="space-y-2">
                {userPosts.map((post: any) => (
                  <li key={post._id} className="border-b pb-2">
                    <div className="font-semibold">{post.text}</div>
                    <div className="text-xs text-gray-500">{new Date(post.createdAt).toLocaleString()}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
          {/* User's Comments */}
          <div className="bg-white rounded-xl shadow p-6 border border-agrogreen-100 md:col-span-2">
            <h2 className="text-xl font-bold text-agrogreen-700 mb-2 flex items-center gap-2">
              <span>💬</span> Your Comments
            </h2>
            {userComments.length === 0 ? (
              <p className="text-gray-500">You haven't commented yet.</p>
            ) : (
              <ul className="space-y-2">
                {userComments.map((c: any, i: number) => (
                  <li key={i} className="border-b pb-2">
                    <div className="text-sm">{c.text}</div>
                    <div className="text-xs text-gray-500">On post: {c.postText}</div>
                    <div className="text-xs text-gray-400">{new Date(c.createdAt).toLocaleString()}</div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 