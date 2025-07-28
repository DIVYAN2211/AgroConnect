import { useState } from "react";
import { Search, Filter, ShoppingCart, ExternalLink } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { marketplaceProducts } from '@/data/marketplaceProducts';
import { useCart } from "@/context/cart-context";

const Marketplace = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [quantity, setQuantity] = useState<{ [key: string]: number }>({});
  const { addToCart } = useCart();

  const categories = ['all', ...marketplaceProducts.categories];

  const filteredProducts = marketplaceProducts.products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-agrogreen-600 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl font-bold mb-4">Agricultural Marketplace</h1>
            <p className="text-lg mb-8">Find the best agricultural products for your farm</p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <Input
                type="text"
                placeholder="Search for products..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 bg-white text-gray-900"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8">
        {/* Category Filter */}
        <div className="mb-8">
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
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredProducts.map(product => (
            <Card key={product.id} className="overflow-hidden">
              <CardHeader className="p-0">
                <div className="relative">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className="absolute top-2 right-2 bg-white/90 rounded-full px-3 py-1 text-sm font-medium">
                    ₹{product.price}
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
                  Category: {product.category}
                </p>
              </CardContent>
              <CardFooter className="p-4 pt-0">
                <div className="flex flex-col gap-2 w-full">
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min="1"
                      value={quantity[product.id] || ''}
                      onChange={(e) => setQuantity({
                        ...quantity,
                        [product.id]: Number(e.target.value)
                      })}
                      placeholder="Quantity"
                      className="w-24"
                    />
                    <Button
                      onClick={() => addToCart(product, quantity[product.id] || 1)}
                      className="flex-1 bg-agrogreen-600 hover:bg-agrogreen-700"
                      disabled={!quantity[product.id] || quantity[product.id] <= 0}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </Button>
                  </div>
                  <Button
                    variant="outline"
                    className="w-full"
                    onClick={() => window.open(product.amazonLink, '_blank')}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Buy on Amazon
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredProducts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500">No products found matching your criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Marketplace;
