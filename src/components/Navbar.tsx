import { useState } from 'react';
import { Link } from 'react-router-dom';
import { Menu, X, User, ShoppingCart, Leaf, LogOut, Search } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/lib/auth-context';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Input } from "@/components/ui/input";
import { useCart } from "@/context/cart-context";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const { user, isAuthenticated, logout } = useAuth();
  const { cart, removeFromCart, updateQuantity, getTotalItems, getTotalPrice } = useCart();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleLogout = () => {
    logout();
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Implement search functionality
    console.log("Searching for:", searchQuery);
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img 
                src="https://media.istockphoto.com/id/866393210/vector/farm-icon.jpg?s=612x612&w=0&k=20&c=CZnGt4ER-NjDGJJMzyYaGEz3ko9BoYnuf2vNRp-cMfc=" 
                alt="AgroConnect Logo" 
                className="h-16 w-16"
              />
              <span className="ml-2 text-xl font-bold text-agrogreen-600">AgroConnect</span>
            </Link>
            <div className="hidden md:ml-6 md:flex md:space-x-2">
              <Link to="/" className="nav-item active">Home</Link>
              <Link to="/marketplace" className="nav-item">Marketplace</Link>
              <Link to="/weather" className="nav-item">Weather</Link>
              <Link to="/knowledge" className="nav-item">Knowledge Hub</Link>
              <Link to="/forum" className="nav-item">Community</Link>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-2">
            <form onSubmit={handleSearch} className="flex items-center">
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64"
              />
              <Button type="submit" variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
            </form>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="relative">
                  <ShoppingCart className="h-5 w-5" />
                  {getTotalItems() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-agrogreen-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      {getTotalItems()}
                    </span>
                  )}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-80 p-4">
                <div className="space-y-4">
                  <h3 className="font-semibold">Your Cart ({getTotalItems()} items)</h3>
                  {cart.length === 0 ? (
                    <p className="text-gray-500 text-center py-4">Your cart is empty</p>
                  ) : (
                    <>
                      <div className="space-y-2 max-h-60 overflow-y-auto">
                        {cart.map((item) => (
                          <div key={item.productId} className="flex items-center gap-4 p-2 border rounded">
                            <img
                              src={item.product.image}
                              alt={item.product.name}
                              className="w-12 h-12 object-cover rounded"
                            />
                            <div className="flex-1">
                              <h4 className="font-medium text-sm">{item.product.name}</h4>
                              <p className="text-sm text-gray-500">₹{item.product.price} × {item.quantity}</p>
                            </div>
                            <div className="flex items-center gap-2">
                              <Input
                                type="number"
                                min="1"
                                value={item.quantity}
                                onChange={(e) => updateQuantity(item.productId, Number(e.target.value))}
                                className="w-16 h-8"
                              />
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={() => removeFromCart(item.productId)}
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="border-t pt-4">
                        <div className="flex justify-between font-semibold">
                          <span>Total:</span>
                          <span>₹{getTotalPrice().toLocaleString()}</span>
                        </div>
                        <Link to="/cart">
  <Button className="w-full mt-2" variant="outline">
    View Cart
  </Button>
</Link>

                      </div>
                    </>
                  )}
                </div>
              </DropdownMenuContent>
            </DropdownMenu>
            {isAuthenticated ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center">
                    <User className="h-5 w-5 mr-1" />
                    <span>{user?.name}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link to="/dashboard">Dashboard</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={handleLogout} className="text-red-600">
                    <LogOut className="h-4 w-4 mr-2" />
                    Logout
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Button variant="outline" size="sm" asChild>
                  <Link to="/login">Login</Link>
                </Button>
                <Button size="sm" asChild>
                  <Link to="/register">Register</Link>
                </Button>
              </>
            )}
          </div>
          <div className="flex items-center md:hidden">
            <button
              onClick={toggleMenu}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
            >
              <span className="sr-only">Open main menu</span>
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>
      </div>
      
      {isOpen && (
        <div className="md:hidden">
          <div className="px-2 pt-2 pb-3 space-y-1 bg-white border-t">
            <form onSubmit={handleSearch} className="flex items-center">
              <Input
                type="text"
                placeholder="Search..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1"
              />
              <Button type="submit" variant="ghost" size="icon">
                <Search className="h-5 w-5" />
              </Button>
            </form>
            <div className="flex flex-col space-y-4">
              <Link
                to="/"
                className="text-gray-700 hover:text-agrogreen-600"
                onClick={() => setIsOpen(false)}
              >
                Home
              </Link>
              <Link
                to="/marketplace"
                className="text-gray-700 hover:text-agrogreen-600"
                onClick={() => setIsOpen(false)}
              >
                Marketplace
              </Link>
              <Link
                to="/weather"
                className="text-gray-700 hover:text-agrogreen-600"
                onClick={() => setIsOpen(false)}
              >
                Weather
              </Link>
              <Link
                to="/blog"
                className="text-gray-700 hover:text-agrogreen-600"
                onClick={() => setIsOpen(false)}
              >
                Knowledge Hub
              </Link>
              <a
  href="http://127.0.0.1:5500/frontend/index.html"
  target="_blank"
  rel="noopener noreferrer"
  className="nav-item"
>
  Community
</a>

              {isAuthenticated ? (
                <div className="flex flex-col space-y-2">
                  <span className="text-gray-700">{user?.name}</span>
                  <Button variant="outline" onClick={handleLogout}>
                    Logout
                  </Button>
                </div>
              ) : (
                <div className="flex flex-col space-y-2">
                  <Link to="/login" className="text-gray-700 hover:text-agrogreen-600">
                    Login
                  </Link>
                  <Link to="/register" className="text-gray-700 hover:text-agrogreen-600">
                    Register
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
