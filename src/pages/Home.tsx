import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Leaf, BookOpen, Users, ShoppingCart, ArrowRight, Newspaper } from 'lucide-react';
import AgriNews from '@/components/AgriNews';
import { useRef } from 'react';

const Home = () => {
  const newsSectionRef = useRef<HTMLDivElement>(null);

  const scrollToNews = () => {
    newsSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative py-24 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ 
            backgroundImage: 'url("https://franchiseindia.s3.ap-south-1.amazonaws.com/uploads/content/wi/art/5c9cac26daa81.jpeg")'
          }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="container mx-auto px-4 relative">
          <div className="max-w-3xl mx-auto text-center">
            <div className="flex justify-center mb-6">
              <Leaf className="h-12 w-12 text-white" />
            </div>
            <h1 className="text-5xl font-bold mb-6 leading-tight text-white">
              Welcome to <span className="text-agrogreen-200">AgroConnect</span>
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Your one-stop platform for agricultural knowledge, marketplace, and community
            </p>
            <div className="flex justify-center gap-4">
              <Button asChild size="lg" className="bg-white text-agrogreen-600 hover:bg-agrogreen-50">
                <Link to="/marketplace" className="flex items-center gap-2">
                  <ShoppingCart className="h-5 w-5" />
                  Explore Marketplace
                </Link>
              </Button>
              <Button asChild size="lg" className="bg-white text-agrogreen-600 hover:bg-agrogreen-50">
                <Link to="/blog" className="flex items-center gap-2">
                  <BookOpen className="h-5 w-5" />
                  Learn More
                </Link>
              </Button>
              <Button 
                size="lg" 
                className="bg-white text-agrogreen-600 hover:bg-agrogreen-50"
                onClick={scrollToNews}
              >
                <div className="flex items-center gap-2">
                  <Newspaper className="h-5 w-5" />
                  Agri News
                </div>
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Our Features</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover how AgroConnect can help you grow your agricultural business
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="group p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-agrogreen-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-agrogreen-600 group-hover:text-white transition-colors">
                <ShoppingCart className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Marketplace</h3>
              <p className="text-gray-600 mb-4">
                Buy and sell agricultural products with ease. Find everything from seeds to machinery.
              </p>
              <Link to="/marketplace" className="text-agrogreen-600 font-medium flex items-center gap-2 group-hover:text-agrogreen-700">
                Explore Marketplace
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="group p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-agrogreen-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-agrogreen-600 group-hover:text-white transition-colors">
                <BookOpen className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Knowledge Hub</h3>
              <p className="text-gray-600 mb-4">
                Access expert articles, guides, and resources to improve your farming practices.
              </p>
              <Link to="/blog" className="text-agrogreen-600 font-medium flex items-center gap-2 group-hover:text-agrogreen-700">
                Start Learning
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="group p-8 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
              <div className="w-12 h-12 bg-agrogreen-100 rounded-lg flex items-center justify-center mb-6 group-hover:bg-agrogreen-600 group-hover:text-white transition-colors">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold mb-4">Community</h3>
              <p className="text-gray-600 mb-4">
                Connect with other farmers, share experiences, and get answers to your questions.
              </p>
              <Link to="/forum" className="text-agrogreen-600 font-medium flex items-center gap-2 group-hover:text-agrogreen-700">
                Join Community
                <ArrowRight className="h-4 w-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Agri News Section */}
      <div ref={newsSectionRef} className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold mb-4">Latest Agricultural News</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Stay updated with the latest developments in agriculture and farming
            </p>
          </div>
          <AgriNews />
        </div>
      </div>

      {/* Stats Section */}
      <div className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-agrogreen-600 mb-2">1000+</div>
              <div className="text-gray-600">Active Farmers</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-agrogreen-600 mb-2">5000+</div>
              <div className="text-gray-600">Products</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-agrogreen-600 mb-2">100+</div>
              <div className="text-gray-600">Expert Articles</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-agrogreen-600 mb-2">24/7</div>
              <div className="text-gray-600">Support</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home; 