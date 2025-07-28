import { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CropUploadForm } from '@/components/crops/CropUploadForm';
import { CropList } from '@/components/crops/CropList';
import { ShoppingCart } from '@/components/crops/ShoppingCart';
import { Dashboard } from '@/components/crops/Dashboard';
import { CropProduct, Order } from '@/data/cropProducts';
import { toast } from 'sonner';

export const Crops = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('browse');
  const [cart, setCart] = useState<{ product: CropProduct; quantity: number }[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);

  const handleAddToCart = (product: CropProduct, quantity: number) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.product.id === product.id);
      if (existingItem) {
        return prevCart.map(item =>
          item.product.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevCart, { product, quantity }];
    });
    toast.success('Added to cart');
  };

  const handleRemoveFromCart = (productId: string) => {
    setCart(prevCart => prevCart.filter(item => item.product.id !== productId));
    toast.success('Removed from cart');
  };

  const handleUpdateQuantity = (productId: string, quantity: number) => {
    setCart(prevCart =>
      prevCart.map(item =>
        item.product.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const handlePlaceOrder = async (orderDetails: {
    items: { product: CropProduct; quantity: number }[];
    paymentMethod: 'cod' | 'online';
    deliveryAddress: string;
  }) => {
    if (!user) {
      toast.error('Please login to place an order');
      navigate('/login');
      return;
    }

    try {
      const newOrder: Order = {
        id: `order${Date.now()}`,
        productId: orderDetails.items[0].product.id,
        productName: orderDetails.items[0].product.name,
        quantity: orderDetails.items[0].quantity,
        totalPrice: orderDetails.items[0].product.price * orderDetails.items[0].quantity,
        buyerId: user.id,
        buyerName: user.name || '',
        farmerId: orderDetails.items[0].product.farmerId,
        farmerName: orderDetails.items[0].product.farmerName,
        status: 'pending',
        paymentMethod: orderDetails.paymentMethod,
        paymentStatus: orderDetails.paymentMethod === 'online' ? 'completed' : 'pending',
        createdAt: new Date(),
        updatedAt: new Date()
      };

      setOrders(prevOrders => [...prevOrders, newOrder]);
      setCart([]);
      toast.success('Order placed successfully!');
      setActiveTab('dashboard');
    } catch (error) {
      toast.error('Failed to place order. Please try again.');
    }
  };

  const handleUpdateOrderStatus = (orderId: string, status: Order['status']) => {
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.id === orderId
          ? { ...order, status, updatedAt: new Date() }
          : order
      )
    );
    toast.success(`Order ${status} successfully`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="mb-6">
            <TabsTrigger value="browse">Browse Crops</TabsTrigger>
            {user?.role === 'farmer' && (
              <TabsTrigger value="upload">Upload Crop</TabsTrigger>
            )}
            <TabsTrigger value="cart">Cart ({cart.length})</TabsTrigger>
            <TabsTrigger value="dashboard">Dashboard</TabsTrigger>
          </TabsList>

          <TabsContent value="browse">
            <CropList
              products={[]} // Replace with your actual products data
              onAddToCart={handleAddToCart}
            />
          </TabsContent>

          {user?.role === 'farmer' && (
            <TabsContent value="upload">
              <CropUploadForm />
            </TabsContent>
          )}

          <TabsContent value="cart">
            <ShoppingCart
              cart={cart}
              onRemoveItem={handleRemoveFromCart}
              onUpdateQuantity={handleUpdateQuantity}
              onPlaceOrder={handlePlaceOrder}
            />
          </TabsContent>

          <TabsContent value="dashboard">
            <Dashboard
              orders={orders}
              onUpdateOrderStatus={handleUpdateOrderStatus}
            />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}; 