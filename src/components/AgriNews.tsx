import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';

interface NewsArticle {
  title: string;
  description: string;
  url: string;
  publishedAt: string;
  source: {
    name: string;
  };
  urlToImage?: string;
}

const AgriNews = () => {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await fetch(
          `https://newsapi.org/v2/everything?q=(agriculture OR farming OR crops) AND (Tamil Nadu OR India)&language=en&sortBy=publishedAt&apiKey=2df1cfde5ae94347a475f2cd2703fd27`
        );

        if (!response.ok) {
          throw new Error(`Failed to fetch news: ${response.status} ${response.statusText}`);
        }

        const data = await response.json();
        
        if (!data.articles || data.articles.length === 0) {
          throw new Error('No agricultural news found');
        }
        
        setNews(data.articles.slice(0, 3)); // Show only 3 latest articles
      } catch (err) {
        console.error('Error fetching news:', err);
        setError(err instanceof Error ? err.message : 'Failed to fetch news');
        // Fallback to sample data
        setNews([
          {
            title: "Tamil Nadu Farmers Adopt Sustainable Farming Practices",
            description: "Farmers in Tamil Nadu are increasingly adopting sustainable agricultural methods to improve yields and reduce environmental impact.",
            url: "https://example.com/news1",
            publishedAt: new Date().toISOString(),
            source: { name: "Tamil Nadu Agricultural Times" },
            urlToImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          },
          {
            title: "New Agricultural Policy Boosts Indian Farmers",
            description: "The Indian government's new agricultural policy aims to support farmers with better infrastructure and market access.",
            url: "https://example.com/news2",
            publishedAt: new Date().toISOString(),
            source: { name: "Indian Farm Journal" },
            urlToImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          },
          {
            title: "Tamil Nadu's Organic Farming Initiative Shows Promise",
            description: "A new organic farming initiative in Tamil Nadu is helping farmers transition to chemical-free agriculture.",
            url: "https://example.com/news3",
            publishedAt: new Date().toISOString(),
            source: { name: "Agri News Tamil Nadu" },
            urlToImage: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60"
          }
        ]);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-8">
        <Loader2 className="h-8 w-8 animate-spin text-agrogreen-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-600 mb-4">Error: {error}</p>
        <p className="text-gray-600">Showing sample news articles instead.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      {news.map((article, index) => (
        <Card key={index} className="hover:shadow-lg transition-shadow">
          {article.urlToImage && (
            <div className="relative h-48 overflow-hidden">
              <img 
                src={article.urlToImage} 
                alt={article.title}
                className="w-full h-full object-cover"
              />
            </div>
          )}
          <CardHeader>
            <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
            <p className="text-sm text-gray-500">
              {new Date(article.publishedAt).toLocaleDateString()} • {article.source.name}
            </p>
          </CardHeader>
          <CardContent>
            <p className="text-gray-600 mb-4 line-clamp-3">{article.description}</p>
            <Button asChild variant="outline" className="w-full">
              <a href={article.url} target="_blank" rel="noopener noreferrer">
                Read More
              </a>
            </Button>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default AgriNews; 