import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "@/lib/auth-context";
import { CartProvider } from '@/context/cart-context';
import Navbar from '@/components/Navbar';
import Home from '@/pages/Home';
import Marketplace from '@/pages/Marketplace';
import Blog from '@/pages/Blog';
import WeatherPage from '@/pages/Weather';
import Login from '@/pages/Login';
import Register from '@/pages/Register';
import NotFound from '@/pages/NotFound';
import Forum from '@/pages/Forum';
import About from '@/pages/About';
import Contact from '@/pages/Contact';
import CartPage from '@/pages/CartPage';
import KnowledgeHub from '@/pages/KnowledgeHub';
import Dashboard from '@/pages/Dashboard';

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <CartProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Navbar />
            <main className="container mx-auto px-4 py-8">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/marketplace" element={<Marketplace />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/weather" element={<WeatherPage />} />
                <Route path="/cart" element={<CartPage />} />
                <Route path="/blog" element={<Blog />} />
                <Route path="/forum" element={<Forum />} />
                <Route path="/about" element={<About />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/knowledge" element={<KnowledgeHub />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </main>
          </BrowserRouter>
        </TooltipProvider>
      </CartProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
