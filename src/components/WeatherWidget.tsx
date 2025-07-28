
import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Cloud, CloudRain, Sun, CloudSun, Thermometer, Droplet, Wind } from 'lucide-react';

interface WeatherData {
  temperature: number;
  condition: string;
  humidity: number;
  windSpeed: number;
  location: string;
  forecast: Array<{
    day: string;
    temperature: number;
    condition: string;
  }>;
}

// Mock data for demo purposes
const mockWeatherData: WeatherData = {
  temperature: 24,
  condition: 'Partly Cloudy',
  humidity: 65,
  windSpeed: 12,
  location: 'Central Valley',
  forecast: [
    { day: 'Mon', temperature: 24, condition: 'Sunny' },
    { day: 'Tue', temperature: 25, condition: 'Sunny' },
    { day: 'Wed', temperature: 23, condition: 'Cloudy' },
    { day: 'Thu', temperature: 22, condition: 'Rain' },
    { day: 'Fri', temperature: 21, condition: 'Partly Cloudy' },
  ]
};

const WeatherIcon = ({ condition }: { condition: string }) => {
  switch (condition.toLowerCase()) {
    case 'sunny':
      return <Sun className="h-8 w-8 text-yellow-500" />;
    case 'cloudy':
      return <Cloud className="h-8 w-8 text-gray-400" />;
    case 'rain':
      return <CloudRain className="h-8 w-8 text-blue-400" />;
    case 'partly cloudy':
    default:
      return <CloudSun className="h-8 w-8 text-gray-400" />;
  }
};

const WeatherWidget = () => {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    // In a real app, we would fetch data from a weather API
    // For now, simulate API call with setTimeout
    const timer = setTimeout(() => {
      setWeather(mockWeatherData);
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Weather Advisory</CardTitle>
          <CardDescription>Loading weather information...</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  if (!weather) {
    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Weather Advisory</CardTitle>
          <CardDescription>Unable to load weather data</CardDescription>
        </CardHeader>
      </Card>
    );
  }

  return (
    <Card className="w-full">
      <CardHeader className="pb-2">
        <CardTitle>Weather Advisory</CardTitle>
        <CardDescription>{weather.location}</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <WeatherIcon condition={weather.condition} />
            <div className="ml-4">
              <div className="text-3xl font-bold">{weather.temperature}°C</div>
              <div className="text-sm text-gray-500">{weather.condition}</div>
            </div>
          </div>
          <div className="flex flex-col space-y-2">
            <div className="flex items-center">
              <Droplet className="h-4 w-4 text-blue-400 mr-2" />
              <span className="text-sm">{weather.humidity}% Humidity</span>
            </div>
            <div className="flex items-center">
              <Wind className="h-4 w-4 text-gray-400 mr-2" />
              <span className="text-sm">{weather.windSpeed} km/h</span>
            </div>
          </div>
        </div>

        <div>
          <h4 className="font-medium mb-2 text-sm">5-Day Forecast</h4>
          <div className="grid grid-cols-5 gap-1">
            {weather.forecast.map((day, index) => (
              <div key={index} className="flex flex-col items-center p-2 bg-gray-50 rounded">
                <span className="text-xs font-medium">{day.day}</span>
                <WeatherIcon condition={day.condition} />
                <span className="text-xs mt-1">{day.temperature}°</span>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-4 p-3 bg-yellow-50 border border-yellow-100 rounded">
          <h4 className="text-sm font-medium text-yellow-800">Farming Advisory</h4>
          <p className="text-xs text-yellow-700 mt-1">
            {weather.condition.toLowerCase().includes('rain') 
              ? "Rain expected. Consider postponing outdoor activities like spraying and harvesting." 
              : "Good weather for outdoor activities. Ideal for harvesting crops that are ready."}
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeatherWidget;
