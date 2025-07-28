
import { Link } from 'react-router-dom';
import { ArrowRight, Leaf, ShoppingCart, CloudSun, BookOpen, Users } from 'lucide-react';
import { Button } from '@/components/ui/button';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import CropCard from '@/components/CropCard';
import WeatherWidget from '@/components/WeatherWidget';
import BlogCard from '@/components/BlogCard';

// Sample data for demonstration
const featuredCrops = [
  {
    id: '1',
    title: 'Organic Red Apples',
    price: 2.99,
    unit: 'kg',
    location: 'Western Farms',
    image: 'https://images.unsplash.com/photo-1517022812141-23620dba5c23',
    farmerName: 'John Doe',
    category: 'Fruits'
  },
  {
    id: '2',
    title: 'Fresh Carrots',
    price: 1.49,
    unit: 'kg',
    location: 'Eastern Fields',
    image: 'https://images.unsplash.com/photo-1469041797191-50ace28483c3',
    farmerName: 'Jane Smith',
    category: 'Vegetables'
  },
  {
    id: '3',
    title: 'Premium Rice',
    price: 4.99,
    unit: 'kg',
    location: 'Southern Paddies',
    image: 'https://images.unsplash.com/photo-1472396961693-142e6e269027',
    farmerName: 'Robert Johnson',
    category: 'Grains'
  }
];

const featuredBlogs = [
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
  }
];

const Home = () => {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      {/* Hero Section */}
      <section className="hero-section text-white py-24 md:py-32">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 animate-fade-in">
              Growing a Sustainable Future Together
            </h1>
            <p className="text-lg md:text-xl mb-8 opacity-90 animate-fade-in">
              AgroConnect brings together farmers, buyers, and agricultural experts in one unified platform to revolutionize farming practices and market accessibility.
            </p>
            <div className="flex flex-wrap gap-4">
              <Button size="lg" asChild>
                <Link to="/register">Join AgroConnect</Link>
              </Button>
              <Button size="lg" variant="outline" className="bg-white/10" asChild>
                <Link to="/marketplace">Explore Marketplace</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="section-container bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">What We Offer</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            AgroConnect provides comprehensive tools for the agricultural community, helping connect the dots between production and market.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="bg-agrogreen-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <ShoppingCart className="h-8 w-8 text-agrogreen-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Crop Marketplace</h3>
            <p className="text-gray-600">Connect directly with buyers and sell your crops at fair prices.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="bg-skyblue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <CloudSun className="h-8 w-8 text-skyblue-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Weather Advisory</h3>
            <p className="text-gray-600">Get real-time weather updates and crop-specific recommendations.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="bg-earthy-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-8 w-8 text-earthy-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Knowledge Hub</h3>
            <p className="text-gray-600">Access expert farming advice and educational resources.</p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm text-center">
            <div className="bg-agrogreen-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="h-8 w-8 text-agrogreen-600" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Farming Community</h3>
            <p className="text-gray-600">Join discussions and connect with fellow farmers and experts.</p>
          </div>
        </div>
      </section>
      
      {/* Marketplace Preview */}
      <section className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div>
            <h2 className="text-3xl font-bold">Featured Crops</h2>
            <p className="text-gray-600 mt-2">Discover quality products from verified farmers</p>
          </div>
          <Button variant="ghost" className="flex items-center" asChild>
            <Link to="/marketplace">
              View All <ArrowRight className="ml-1 h-4 w-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredCrops.map((crop) => (
            <CropCard key={crop.id} {...crop} />
          ))}
        </div>
      </section>
      
      {/* Weather and Blog Section */}
      <section className="section-container bg-gray-50">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <WeatherWidget />
          </div>
          
          <div className="lg:col-span-2">
            <div className="flex justify-between items-center mb-6">
              <div>
                <h2 className="text-2xl font-bold">Latest Articles</h2>
                <p className="text-gray-600 mt-1">Stay updated with farming insights</p>
              </div>
              <Button variant="ghost" className="flex items-center" asChild>
                <Link to="/blog">
                  View All <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {featuredBlogs.map((blog) => (
                <BlogCard key={blog.id} {...blog} />
              ))}
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 bg-agrogreen-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <div className="flex items-center justify-center mb-6">
            <Leaf className="h-10 w-10 mr-2" />
            <h2 className="text-3xl font-bold">Ready to grow with AgroConnect?</h2>
          </div>
          <p className="max-w-2xl mx-auto mb-8 opacity-90">
            Join thousands of farmers and buyers already revolutionizing the agricultural marketplace.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-agrogreen-600">
              Learn More
            </Button>
            <Button size="lg" className="bg-white text-agrogreen-600 hover:bg-gray-100" asChild>
              <Link to="/register">Get Started</Link>
            </Button>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default Home;
