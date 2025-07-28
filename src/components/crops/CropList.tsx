import { useState } from 'react';
import { Search, Filter } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CropProduct } from '@/data/cropProducts';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';

interface CropListProps {
  products: CropProduct[];
  onAddToCart: (product: CropProduct, quantity: number) => void;
}

export const CropList = ({ products, onAddToCart }: CropListProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [quantity, setQuantity] = useState<{ [key: string]: number }>({});

  const categories = ['all', 'grains', 'pulses', 'oilseeds', 'vegetables', 'fruits'];
  const locations = ['all', ...new Set(products.map(p => p.location))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesLocation = selectedLocation === 'all' || product.location === selectedLocation;
    return matchesSearch && matchesCategory && matchesLocation;
  });

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Search and Filters */}
      <div className="mb-8 space-y-4">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          <Input
            type="text"
            placeholder="Search crops..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10"
          />
        </div>

        <div className="flex gap-4">
          <Select value={selectedCategory} onValueChange={setSelectedCategory}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(category => (
                <SelectItem key={category} value={category}>
                  {category.charAt(0).toUpperCase() + category.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select value={selectedLocation} onValueChange={setSelectedLocation}>
            <SelectTrigger className="w-[180px]">
              <Filter className="mr-2 h-4 w-4" />
              <SelectValue placeholder="Location" />
            </SelectTrigger>
            <SelectContent>
              {locations.map(location => (
                <SelectItem key={location} value={location}>
                  {location.charAt(0).toUpperCase() + location.slice(1)}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Products Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map(product => (
          <Card key={product.id} className="overflow-hidden">
            <CardHeader className="p-0">
              <div className="relative">
                <img
                  src={product.images[0]}
                  alt={product.name}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-2 right-2 bg-white/90 rounded-full px-3 py-1 text-sm font-medium">
                  ₹{product.price}/{product.unit}
                </div>
              </div>
            </CardHeader>
            <CardContent className="p-4">
              <CardTitle className="text-lg font-semibold mb-2 line-clamp-2">
                {product.name}
              </CardTitle>
              <p className="text-gray-600 text-sm line-clamp-2 mb-2">
                {product.description}
              </p>
              <p className="text-sm text-gray-500">
                Farmer: {product.farmerName}
              </p>
              <p className="text-sm text-gray-500">
                Location: {product.location}
              </p>
              <p className="text-sm text-gray-500">
                Available: {product.quantity} {product.unit}
              </p>
            </CardContent>
            <CardFooter className="p-4 pt-0">
              <div className="flex items-center gap-2 w-full">
                <Input
                  type="number"
                  min="1"
                  max={product.quantity}
                  value={quantity[product.id] || ''}
                  onChange={(e) => setQuantity({
                    ...quantity,
                    [product.id]: Math.min(Number(e.target.value), product.quantity)
                  })}
                  placeholder="Quantity"
                  className="w-24"
                />
                <Button
                  onClick={() => onAddToCart(product, quantity[product.id] || 1)}
                  className="flex-1 bg-agrogreen-600 hover:bg-agrogreen-700"
                  disabled={!quantity[product.id] || quantity[product.id] <= 0}
                >
                  <ShoppingCart className="mr-2 h-4 w-4" />
                  Add to Cart
                </Button>
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-gray-500">No crops found matching your criteria.</p>
        </div>
      )}
    </div>
  );
}; 