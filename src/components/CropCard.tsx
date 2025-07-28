
import { Link } from 'react-router-dom';
import { MapPin, Tag, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardFooter } from '@/components/ui/card';

interface CropCardProps {
  id: string;
  title: string;
  price: number;
  unit: string;
  location: string;
  image: string;
  farmerName: string;
  category: string;
}

const CropCard = ({
  id,
  title,
  price,
  unit,
  location,
  image,
  farmerName,
  category
}: CropCardProps) => {
  return (
    <Card className="overflow-hidden card-hover">
      <div className="relative h-48 bg-gray-100">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-agrogreen-600 text-white text-xs px-2 py-1 rounded-full">
          {category}
        </div>
      </div>
      <CardContent className="pt-4">
        <h3 className="text-lg font-semibold tracking-tight">{title}</h3>
        <div className="flex items-center mt-1 text-sm text-gray-500">
          <MapPin className="h-3.5 w-3.5 mr-1" /> {location}
        </div>
        <div className="flex items-center mt-1 text-sm">
          <Tag className="h-3.5 w-3.5 mr-1 text-gray-500" />
          <span className="font-medium text-agrogreen-600">
            ${price}/{unit}
          </span>
        </div>
        <div className="mt-2 text-sm text-gray-500">
          By {farmerName}
        </div>
      </CardContent>
      <CardFooter className="flex justify-between pt-0">
        <Button variant="outline" size="sm" asChild>
          <Link to={`/marketplace/${id}`}>
            <Info className="h-4 w-4 mr-1" /> Details
          </Link>
        </Button>
        <Button size="sm">Contact Seller</Button>
      </CardFooter>
    </Card>
  );
};

export default CropCard;
