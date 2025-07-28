import { Link } from 'react-router-dom';
import { Twitter, Facebook, Instagram, Mail, Leaf } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="mb-8 md:mb-0">
            <Link to="/" className="flex items-center">
              <img 
                src="https://media.istockphoto.com/id/866393210/vector/farm-icon.jpg?s=612x612&w=0&k=20&c=CZnGt4ER-NjDGJJMzyYaGEz3ko9BoYnuf2vNRp-cMfc=" 
                alt="AgroConnect Logo" 
                className="h-8 w-8"
              />
              <span className="ml-2 text-xl font-bold text-agrogreen-600">AgroConnect</span>
            </Link>
            <p className="mt-3 text-sm text-gray-600">
              Connecting farmers, buyers, and agricultural experts to create a thriving farming ecosystem.
            </p>
            <div className="flex space-x-4 mt-4">
              <a href="#" className="text-gray-400 hover:text-agrogreen-600">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-agrogreen-600">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-agrogreen-600">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-400 hover:text-agrogreen-600">
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="text-base font-medium text-gray-900">Platform</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/marketplace" className="text-sm text-gray-600 hover:text-agrogreen-600">Marketplace</Link></li>
              <li><Link to="/weather" className="text-sm text-gray-600 hover:text-agrogreen-600">Weather Advisory</Link></li>
              <li><Link to="/blog" className="text-sm text-gray-600 hover:text-agrogreen-600">Knowledge Hub</Link></li>
              <li><Link to="/forum" className="text-sm text-gray-600 hover:text-agrogreen-600">Community Forum</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-medium text-gray-900">Account</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/register" className="text-sm text-gray-600 hover:text-agrogreen-600">Sign Up</Link></li>
              <li><Link to="/login" className="text-sm text-gray-600 hover:text-agrogreen-600">Login</Link></li>
              <li><Link to="/profile" className="text-sm text-gray-600 hover:text-agrogreen-600">My Profile</Link></li>
              <li><Link to="/dashboard" className="text-sm text-gray-600 hover:text-agrogreen-600">Dashboard</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-base font-medium text-gray-900">Support</h3>
            <ul className="mt-4 space-y-2">
              <li><Link to="/contact" className="text-sm text-gray-600 hover:text-agrogreen-600">Contact Us</Link></li>
              <li><Link to="/faq" className="text-sm text-gray-600 hover:text-agrogreen-600">FAQs</Link></li>
              <li><Link to="/privacy" className="text-sm text-gray-600 hover:text-agrogreen-600">Privacy Policy</Link></li>
              <li><Link to="/terms" className="text-sm text-gray-600 hover:text-agrogreen-600">Terms of Service</Link></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-gray-200">
          <p className="text-sm text-gray-500 text-center">
            © {new Date().getFullYear()} AgroConnect. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
