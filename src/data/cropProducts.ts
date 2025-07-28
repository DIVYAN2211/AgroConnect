export interface CropProduct {
  id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  unit: string;
  images: string[];
  farmerId: string;
  farmerName: string;
  location: string;
  category: string;
  createdAt: Date;
}

export interface Order {
  id: string;
  productId: string;
  productName: string;
  quantity: number;
  totalPrice: number;
  buyerId: string;
  buyerName: string;
  farmerId: string;
  farmerName: string;
  status: 'pending' | 'confirmed' | 'delivered' | 'cancelled';
  paymentMethod: 'cod' | 'online';
  paymentStatus: 'pending' | 'completed';
  createdAt: Date;
  updatedAt: Date;
}

// Sample data for demonstration
export const cropProducts: CropProduct[] = [
  {
    id: 'crop1',
    name: 'Organic Wheat',
    description: 'High quality organic wheat grains',
    price: 45,
    quantity: 1000,
    unit: 'kg',
    images: ['https://images.unsplash.com/photo-1472396961693-142e6e269027'],
    farmerId: 'farmer1',
    farmerName: 'John Doe',
    location: 'Punjab',
    category: 'grains',
    createdAt: new Date('2024-01-01')
  },
  {
    id: 'crop2',
    name: 'Basmati Rice',
    description: 'Premium quality basmati rice',
    price: 80,
    quantity: 500,
    unit: 'kg',
    images: ['https://images.unsplash.com/photo-1472396961693-142e6e269027'],
    farmerId: 'farmer2',
    farmerName: 'Jane Smith',
    location: 'Haryana',
    category: 'grains',
    createdAt: new Date('2024-01-02')
  }
];

export const orders: Order[] = [
  {
    id: 'order1',
    productId: 'crop1',
    productName: 'Organic Wheat',
    quantity: 50,
    totalPrice: 2250,
    buyerId: 'buyer1',
    buyerName: 'Buyer One',
    farmerId: 'farmer1',
    farmerName: 'John Doe',
    status: 'pending',
    paymentMethod: 'cod',
    paymentStatus: 'pending',
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  }
]; 