import { useState } from 'react';
import { useAuth } from '@/context/auth-context';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { X, ShoppingCart } from 'lucide-react';
import { CropProduct } from '@/data/cropProducts';
import { toast } from 'sonner';

interface CartItem {
  product: CropProduct;
  quantity: number;
}

interface ShoppingCartProps {
  cart: CartItem[];
  onRemoveItem: (productId: string) => void;
  onUpdateQuantity: (productId: string, quantity: number) => void;
  onPlaceOrder: (orderDetails: {
    items: CartItem[];
    paymentMethod: 'cod' | 'online';
    deliveryAddress: string;
  }) => void;
}

export const ShoppingCart = ({ cart, onRemoveItem, onUpdateQuantity, onPlaceOrder }: ShoppingCartProps) => {
  const { user } = useAuth();
  const [paymentMethod, setPaymentMethod] = useState<'cod' | 'online'>('cod');
  const [deliveryAddress, setDeliveryAddress] = useState('');

  const totalAmount = cart.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);

  const handlePlaceOrder = () => {
    if (!deliveryAddress) {
      toast.error('Please enter delivery address');
      return;
    }

    onPlaceOrder({
      items: cart,
      paymentMethod,
      deliveryAddress
    });
  };

  if (cart.length === 0) {
    return (
      <div className="text-center py-12">
        <ShoppingCart className="mx-auto h-12 w-12 text-gray-400" />
        <h3 className="mt-2 text-lg font-medium text-gray-900">Your cart is empty</h3>
        <p className="mt-1 text-gray-500">Add some crops to your cart to get started.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h2 className="text-2xl font-bold mb-6">Shopping Cart</h2>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-4">
          {cart.map(item => (
            <Card key={item.product.id} className="overflow-hidden">
              <CardContent className="p-4">
                <div className="flex items-start gap-4">
                  <img
                    src={item.product.images[0]}
                    alt={item.product.name}
                    className="w-24 h-24 object-cover rounded"
                  />
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.product.name}</h3>
                    <p className="text-sm text-gray-500">
                      Farmer: {item.product.farmerName}
                    </p>
                    <p className="text-sm text-gray-500">
                      Price: ₹{item.product.price}/{item.product.unit}
                    </p>
                    <div className="flex items-center gap-2 mt-2">
                      <Input
                        type="number"
                        min="1"
                        max={item.product.quantity}
                        value={item.quantity}
                        onChange={(e) => onUpdateQuantity(item.product.id, Number(e.target.value))}
                        className="w-20"
                      />
                      <span className="text-sm text-gray-500">{item.product.unit}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">₹{item.product.price * item.quantity}</p>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => onRemoveItem(item.product.id)}
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Order Summary */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Order Summary</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>₹{totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span>Delivery</span>
                <span>₹0</span>
              </div>
              <div className="border-t pt-4">
                <div className="flex justify-between font-semibold">
                  <span>Total</span>
                  <span>₹{totalAmount}</span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="payment">Payment Method</Label>
                  <Select value={paymentMethod} onValueChange={(value: 'cod' | 'online') => setPaymentMethod(value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select payment method" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cod">Cash on Delivery</SelectItem>
                      <SelectItem value="online">Online Payment</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="address">Delivery Address</Label>
                  <Input
                    id="address"
                    value={deliveryAddress}
                    onChange={(e) => setDeliveryAddress(e.target.value)}
                    placeholder="Enter your delivery address"
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button
                className="w-full bg-agrogreen-600 hover:bg-agrogreen-700"
                onClick={handlePlaceOrder}
                disabled={!deliveryAddress}
              >
                Place Order
              </Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}; 