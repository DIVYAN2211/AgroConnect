import { Product } from '@/data/marketplaceProducts';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { ShoppingCart } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard = ({ product }: ProductCardProps) => {
  const handleBuyClick = () => {
    window.open(product.amazonLink, '_blank');
  };

  return (
    <Card className="w-full overflow-hidden hover:shadow-lg transition-all duration-300">
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
        <p className="text-gray-600 text-sm line-clamp-2 mb-4">
          {product.description}
        </p>
      </CardContent>
      <CardFooter className="p-4 pt-0">
        <Button 
          onClick={handleBuyClick} 
          className="w-full bg-agrogreen-600 hover:bg-agrogreen-700"
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          Buy on Amazon
        </Button>
      </CardFooter>
    </Card>
  );
};