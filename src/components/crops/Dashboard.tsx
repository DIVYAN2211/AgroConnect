import { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Order } from '@/data/cropProducts';
import { Badge } from '@/components/ui/badge';

interface DashboardProps {
  orders: Order[];
  onUpdateOrderStatus: (orderId: string, status: Order['status']) => void;
}

export const Dashboard = ({ orders, onUpdateOrderStatus }: DashboardProps) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('orders');

  // Filter orders based on user role
  const farmerOrders = orders.filter(order => order.farmerId === user?.id);
  const buyerOrders = orders.filter(order => order.buyerId === user?.id);

  const getStatusColor = (status: Order['status']) => {
    switch (status) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'confirmed':
        return 'bg-blue-100 text-blue-800';
      case 'delivered':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const renderOrderCard = (order: Order, isFarmer: boolean) => (
    <Card key={order.id} className="mb-4">
      <CardHeader>
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg">{order.productName}</CardTitle>
            <p className="text-sm text-gray-500">
              Order ID: {order.id}
            </p>
          </div>
          <Badge className={getStatusColor(order.status)}>
            {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <p className="text-sm">
            <span className="font-medium">Quantity:</span> {order.quantity}
          </p>
          <p className="text-sm">
            <span className="font-medium">Total Price:</span> ₹{order.totalPrice}
          </p>
          <p className="text-sm">
            <span className="font-medium">Payment Method:</span>{' '}
            {order.paymentMethod === 'cod' ? 'Cash on Delivery' : 'Online Payment'}
          </p>
          <p className="text-sm">
            <span className="font-medium">Payment Status:</span>{' '}
            {order.paymentStatus === 'completed' ? 'Completed' : 'Pending'}
          </p>
          <p className="text-sm">
            <span className="font-medium">
              {isFarmer ? 'Buyer' : 'Farmer'}:
            </span>{' '}
            {isFarmer ? order.buyerName : order.farmerName}
          </p>
          <p className="text-sm">
            <span className="font-medium">Order Date:</span>{' '}
            {new Date(order.createdAt).toLocaleDateString()}
          </p>
        </div>

        {isFarmer && order.status === 'pending' && (
          <div className="mt-4 flex gap-2">
            <Button
              size="sm"
              onClick={() => onUpdateOrderStatus(order.id, 'confirmed')}
            >
              Confirm Order
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => onUpdateOrderStatus(order.id, 'cancelled')}
            >
              Cancel Order
            </Button>
          </div>
        )}

        {isFarmer && order.status === 'confirmed' && (
          <div className="mt-4">
            <Button
              size="sm"
              onClick={() => onUpdateOrderStatus(order.id, 'delivered')}
            >
              Mark as Delivered
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Dashboard</h2>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="mb-6">
          <TabsTrigger value="orders">Orders</TabsTrigger>
          {user?.role === 'farmer' && (
            <TabsTrigger value="products">My Products</TabsTrigger>
          )}
        </TabsList>

        <TabsContent value="orders">
          {user?.role === 'farmer' ? (
            <div>
              <h3 className="text-lg font-semibold mb-4">Orders Received</h3>
              {farmerOrders.length > 0 ? (
                farmerOrders.map(order => renderOrderCard(order, true))
              ) : (
                <p className="text-gray-500">No orders received yet.</p>
              )}
            </div>
          ) : (
            <div>
              <h3 className="text-lg font-semibold mb-4">My Orders</h3>
              {buyerOrders.length > 0 ? (
                buyerOrders.map(order => renderOrderCard(order, false))
              ) : (
                <p className="text-gray-500">No orders placed yet.</p>
              )}
            </div>
          )}
        </TabsContent>

        {user?.role === 'farmer' && (
          <TabsContent value="products">
            <div>
              <h3 className="text-lg font-semibold mb-4">My Products</h3>
              {/* Add product management interface here */}
              <p className="text-gray-500">Product management coming soon.</p>
            </div>
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
}; 