import { useState } from "react";
import { Search, BookOpen } from "lucide-react";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Sample data for demonstration
const blogPosts = [
  {
    id: '1',
    title: 'Sustainable Farming Practices for Small Farms',
    excerpt: 'Learn how small-scale farmers can implement sustainable practices to improve yield while protecting the environment.',
    image: 'https://images.unsplash.com/photo-1493962853295-0fd70327578a',
    date: 'April 15, 2023',
    author: 'Dr. Sarah Williams',
    readTime: '5 min',
    category: 'Sustainability'
  },
  {
    id: '2',
    title: 'The Benefits of Crop Rotation',
    excerpt: 'Discover how rotating your crops can lead to healthier soil, fewer pests, and increased productivity over time.',
    image: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad',
    date: 'March 28, 2023',
    author: 'Michael Chen',
    readTime: '4 min',
    category: 'Techniques'
  },
  {
    id: '3',
    title: 'Understanding Soil Health Indicators',
    excerpt: 'A comprehensive guide to various indicators that can help you assess and improve the health of your soil.',
    image: 'https://images.unsplash.com/photo-1464639351491-a172c2aa2911',
    date: 'February 17, 2023',
    author: 'Elena Rodriguez',
    readTime: '7 min',
    category: 'Soil Management'
  },
  {
    id: '4',
    title: 'Water Conservation Strategies for Farms',
    excerpt: 'Practical methods to reduce water usage while maintaining crop health and productivity in various climates.',
    image: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf',
    date: 'January 30, 2023',
    author: 'Thomas Johnson',
    readTime: '6 min',
    category: 'Water Management'
  },
  {
    id: '5',
    title: 'Organic Pest Control Solutions',
    excerpt: 'Natural and chemical-free approaches to managing common pests that affect agricultural crops.',
    image: 'https://images.unsplash.com/photo-1471193945509-9ad0617afabf',
    date: 'January 12, 2023',
    author: 'Jessica Martinez',
    readTime: '5 min',
    category: 'Pest Management'
  },
  {
    id: '6',
    title: 'Climate-Smart Agriculture: Adapting to Change',
    excerpt: 'How farmers around the world are adapting their practices to address climate change challenges.',
    image: 'https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad',
    date: 'December 5, 2022',
    author: 'Dr. Robert Kim',
    readTime: '8 min',
    category: 'Climate Change'
  }
];

const categories = [
  'All', 'Sustainability', 'Techniques', 'Soil Management', 
  'Water Management', 'Pest Management', 'Climate Change'
];

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would trigger a search API call
    console.log('Searching for:', searchQuery);
  };

  const filteredPosts = blogPosts.filter(post => {
    if (activeCategory !== 'All' && post.category !== activeCategory) {
      return false;
    }
    
    if (searchQuery && !post.title.toLowerCase().includes(searchQuery.toLowerCase())) {
      return false;
    }
    
    return true;
  });

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="bg-agrogreen-50 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Knowledge Hub</h1>
            <p className="mb-6">Discover farming best practices, innovations, and expert advice.</p>
            
            <form onSubmit={handleSearch} className="flex gap-2">
              <div className="relative flex-grow">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Search articles..." 
                  className="pl-9 bg-white text-gray-900"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>
              <Button type="submit" variant="secondary">Search</Button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Blog Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-2 mb-8">
          <BookOpen className="h-5 w-5 text-skyblue-500" />
          <h2 className="text-xl font-semibold">Agricultural Knowledge</h2>
        </div>
        
        <Tabs defaultValue="All" value={activeCategory} onValueChange={setActiveCategory} className="mb-8">
          <TabsList className="grid grid-cols-3 md:grid-cols-7">
            {categories.map((category) => (
              <TabsTrigger key={category} value={category} className="text-xs md:text-sm">
                {category}
              </TabsTrigger>
            ))}
          </TabsList>
          
          <TabsContent value={activeCategory} className="mt-6">
            {filteredPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPosts.map((post) => (
                  <BlogCard key={post.id} {...post} />
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <h3 className="text-lg font-medium text-gray-900 mb-2">No articles found</h3>
                <p className="text-gray-600">Try adjusting your search or category selection.</p>
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
      
      {/* Subscribe Section */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 max-w-xl text-center">
          <h2 className="text-2xl font-bold mb-4">Stay Updated</h2>
          <p className="mb-6 text-gray-600">
            Subscribe to our newsletter to receive the latest farming insights and agricultural news.
          </p>
          <div className="flex gap-2">
            <Input placeholder="Your email address" className="bg-white" />
            <Button>Subscribe</Button>
          </div>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default Blog;
