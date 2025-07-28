
import { Link } from 'react-router-dom';
import { Calendar, User } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface BlogCardProps {
  id: string;
  title: string;
  excerpt: string;
  image: string;
  date: string;
  author: string;
  readTime: string;
  category: string;
}

const BlogCard = ({
  id,
  title,
  excerpt,
  image,
  date,
  author,
  readTime,
  category
}: BlogCardProps) => {
  return (
    <Card className="overflow-hidden h-full card-hover">
      <div className="relative h-48 bg-gray-100">
        <img 
          src={image} 
          alt={title} 
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2 bg-skyblue-500 text-white text-xs px-2 py-1 rounded-full">
          {category}
        </div>
      </div>
      <CardContent className="pt-4">
        <h3 className="text-lg font-semibold line-clamp-2 tracking-tight">{title}</h3>
        <div className="flex items-center mt-1 text-xs text-gray-500 space-x-4">
          <div className="flex items-center">
            <Calendar className="h-3 w-3 mr-1" /> {date}
          </div>
          <div className="flex items-center">
            <User className="h-3 w-3 mr-1" /> {author}
          </div>
        </div>
        <p className="mt-2 text-sm text-gray-600 line-clamp-3">{excerpt}</p>
        <div className="mt-2 text-xs text-gray-500">{readTime} read</div>
      </CardContent>
      <CardFooter className="pt-0">
        <Button variant="outline" size="sm" asChild className="w-full">
          <Link to={`/blog/${id}`}>Read Article</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};

export default BlogCard;
