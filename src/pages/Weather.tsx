import { useState, useEffect } from 'react';
import { MapPin, CloudSun, Info, Loader2, Thermometer, CloudRain, Wind, Droplets, AlertTriangle, Sun, Cloud } from "lucide-react";
import Footer from "@/components/Footer";
import WeatherWidget from "@/components/WeatherWidget";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

interface WeatherData {
  current: {
    temperature: number;
    relative_humidity: number;
    wind_speed: number;
    weather_code: number;
  };
  location: {
    name: string;
    latitude: number;
    longitude: number;
  };
}

interface ForecastData {
  daily: {
    time: string[];
    temperature_2m_max: number[];
    temperature_2m_min: number[];
    weather_code: number[];
    precipitation_probability_max: number[];
  };
}

interface Alert {
  event: string;
  description: string;
}

// Weather code to description mapping
const weatherCodes: { [key: number]: { description: string; icon: string } } = {
  0: { description: "Clear Sky", icon: "01d" },
  1: { description: "Mainly Clear", icon: "02d" },
  2: { description: "Partly Cloudy", icon: "03d" },
  3: { description: "Overcast", icon: "04d" },
  45: { description: "Fog", icon: "50d" },
  48: { description: "Depositing Rime Fog", icon: "50d" },
  51: { description: "Light Drizzle", icon: "09d" },
  53: { description: "Moderate Drizzle", icon: "09d" },
  55: { description: "Dense Drizzle", icon: "09d" },
  61: { description: "Slight Rain", icon: "10d" },
  63: { description: "Moderate Rain", icon: "10d" },
  65: { description: "Heavy Rain", icon: "10d" },
  71: { description: "Slight Snow", icon: "13d" },
  73: { description: "Moderate Snow", icon: "13d" },
  75: { description: "Heavy Snow", icon: "13d" },
  77: { description: "Snow Grains", icon: "13d" },
  80: { description: "Slight Rain Showers", icon: "09d" },
  81: { description: "Moderate Rain Showers", icon: "09d" },
  82: { description: "Violent Rain Showers", icon: "09d" },
  85: { description: "Slight Snow Showers", icon: "13d" },
  86: { description: "Heavy Snow Showers", icon: "13d" },
  95: { description: "Thunderstorm", icon: "11d" },
  96: { description: "Thunderstorm with Slight Hail", icon: "11d" },
  99: { description: "Thunderstorm with Heavy Hail", icon: "11d" },
};

// Fallback weather data for Chennai
const fallbackWeatherData: WeatherData = {
  current: {
    temperature: 28,
    relative_humidity: 75,
    wind_speed: 5.5,
    weather_code: 2
  },
  location: {
    name: "Chennai",
    latitude: 13.0827,
    longitude: 80.2707
  }
};

// Fallback forecast data
const fallbackForecastData: ForecastData = {
  daily: {
    time: [
      new Date().toISOString().split('T')[0],
      new Date(Date.now() + 86400000).toISOString().split('T')[0],
      new Date(Date.now() + 172800000).toISOString().split('T')[0]
    ],
    temperature_2m_max: [28, 29, 27],
    temperature_2m_min: [24, 25, 23],
    weather_code: [2, 0, 61],
    precipitation_probability_max: [0, 0, 60]
  }
};

const cropAdvisories = [
  {
    crop: "Rice",
    advice: "Current weather conditions are favorable for rice cultivation. Ensure proper irrigation to maintain 2-3cm of standing water."
  },
  {
    crop: "Wheat",
    advice: "Weather conditions show possible temperature drops. Consider protective measures for wheat crops against cold stress."
  },
  {
    crop: "Tomatoes",
    advice: "High humidity levels detected. Watch for early blight and implement preventive spraying if necessary."
  },
  {
    crop: "Maize/Corn",
    advice: "Good growing conditions. Maintain regular weeding and ensure adequate nitrogen fertilization during this growth phase."
  },
  {
    crop: "Potatoes",
    advice: "Weather conditions suggest optimal growth. Monitor for late blight as humidity levels increase in the coming days."
  }
];

// Crop recommendation data
const cropRecommendations = {
  temperature: {
    cold: {
      crops: [
        { name: "Wheat", icon: "🌾", description: "Thrives in cooler temperatures (15-20°C)" },
        { name: "Barley", icon: "🌾", description: "Good for cold weather (10-15°C)" },
        { name: "Potatoes", icon: "🥔", description: "Ideal for moderate temperatures (15-20°C)" },
        { name: "Peas", icon: "🥬", description: "Cold-resistant crop (10-20°C)" }
      ],
      advice: "Consider cold-resistant crops and use protective measures like mulching"
    },
    moderate: {
      crops: [
        { name: "Rice", icon: "🌾", description: "Best in warm conditions (20-30°C)" },
        { name: "Maize", icon: "🌽", description: "Thrives in warm weather (20-30°C)" },
        { name: "Soybeans", icon: "🌱", description: "Good for moderate temperatures (20-25°C)" },
        { name: "Cotton", icon: "🧶", description: "Prefers warm conditions (25-30°C)" }
      ],
      advice: "Ideal conditions for most staple crops"
    },
    hot: {
      crops: [
        { name: "Millets", icon: "🌾", description: "Drought-resistant (25-35°C)" },
        { name: "Sorghum", icon: "🌾", description: "Heat-tolerant (25-35°C)" },
        { name: "Groundnut", icon: "🥜", description: "Thrives in hot weather (25-30°C)" },
        { name: "Sesame", icon: "🌱", description: "Heat-resistant (25-35°C)" }
      ],
      advice: "Focus on drought-resistant and heat-tolerant crops"
    }
  },
  rainfall: {
    low: {
      crops: [
        { name: "Pearl Millet", icon: "🌾", description: "Drought-resistant, needs minimal water" },
        { name: "Chickpea", icon: "🌱", description: "Tolerates dry conditions" },
        { name: "Lentils", icon: "🌱", description: "Suitable for low rainfall areas" },
        { name: "Sesame", icon: "🌱", description: "Drought-tolerant crop" }
      ],
      advice: "Focus on drought-resistant crops and implement water conservation techniques"
    },
    moderate: {
      crops: [
        { name: "Rice", icon: "🌾", description: "Needs consistent water supply" },
        { name: "Sugarcane", icon: "🎋", description: "Thrives with regular rainfall" },
        { name: "Jute", icon: "🌱", description: "Good for moderate rainfall" },
        { name: "Tapioca", icon: "🥔", description: "Suitable for moderate rainfall" }
      ],
      advice: "Ideal conditions for water-intensive crops"
    },
    high: {
      crops: [
        { name: "Rice", icon: "🌾", description: "Can tolerate heavy rainfall" },
        { name: "Taro", icon: "🥔", description: "Suitable for wet conditions" },
        { name: "Water Spinach", icon: "🥬", description: "Thrives in water-rich environments" },
        { name: "Lotus", icon: "🌺", description: "Good for waterlogged areas" }
      ],
      advice: "Focus on water-tolerant crops and ensure proper drainage"
    }
  }
};

// Enhanced crop advisories with weather-specific recommendations
const getCropAdvisories = (weather: WeatherData | null, forecast: ForecastData | null) => {
  if (!weather || !forecast) return [];

  const temp = weather.current.temperature;
  const humidity = weather.current.relative_humidity;
  const weatherCode = weather.current.weather_code;
  const weatherInfo = weatherCodes[weatherCode];
  const precipitation = forecast.daily.precipitation_probability_max[0];

  return [
    {
      crop: "Rice",
      icon: "🌾",
      currentAdvice: [
        temp > 35 ? "Reduce water level to prevent heat stress" : "Maintain 2-3cm standing water",
        humidity > 80 ? "Monitor for blast disease" : "Normal growth conditions",
        precipitation > 50 ? "Prepare for water drainage" : "Continue normal irrigation"
      ],
      upcomingAdvice: forecast.daily.precipitation_probability_max[1] > 50 ? 
        "Prepare for heavy rainfall in next 24 hours" : 
        "Continue regular maintenance"
    },
    {
      crop: "Tomatoes",
      icon: "🍅",
      currentAdvice: [
        temp > 30 ? "Increase watering frequency" : "Maintain regular watering schedule",
        humidity > 80 ? "Watch for early blight and implement preventive spraying" : "Normal growth conditions",
        precipitation > 30 ? "Harvest ripe fruits to prevent splitting" : "Continue normal harvesting"
      ],
      upcomingAdvice: forecast.daily.temperature_2m_max[1] > 35 ? 
        "Prepare shade nets for next day" : 
        "Continue regular maintenance"
    },
    {
      crop: "Maize/Corn",
      icon: "🌽",
      currentAdvice: [
        temp > 32 ? "Increase irrigation frequency" : "Maintain regular irrigation",
        humidity > 75 ? "Monitor for rust disease" : "Normal growth conditions",
        precipitation > 40 ? "Check drainage systems" : "Continue normal maintenance"
      ],
      upcomingAdvice: forecast.daily.precipitation_probability_max[1] > 40 ? 
        "Prepare for possible waterlogging" : 
        "Continue regular maintenance"
    },
    {
      crop: "Cotton",
      icon: "🧶",
      currentAdvice: [
        temp > 35 ? "Increase irrigation frequency" : "Maintain regular irrigation",
        humidity > 80 ? "Monitor for boll rot" : "Normal growth conditions",
        precipitation > 30 ? "Delay picking if possible" : "Continue normal picking schedule"
      ],
      upcomingAdvice: forecast.daily.precipitation_probability_max[1] > 30 ? 
        "Delay picking if possible" : 
        "Continue regular picking schedule"
    },
    {
      crop: "Sugarcane",
      icon: "🎋",
      currentAdvice: [
        temp > 30 ? "Ensure adequate irrigation" : "Maintain regular irrigation",
        humidity > 85 ? "Monitor for red rot disease" : "Normal growth conditions",
        precipitation > 50 ? "Check drainage systems" : "Continue normal maintenance"
      ],
      upcomingAdvice: forecast.daily.precipitation_probability_max[1] > 50 ? 
        "Prepare for possible waterlogging" : 
        "Continue regular maintenance"
    },
    {
      crop: "Groundnut",
      icon: "🥜",
      currentAdvice: [
        temp > 32 ? "Increase irrigation frequency" : "Maintain regular irrigation",
        humidity > 80 ? "Monitor for leaf spot" : "Normal growth conditions",
        precipitation > 40 ? "Delay harvesting if possible" : "Continue normal harvesting"
      ],
      upcomingAdvice: forecast.daily.precipitation_probability_max[1] > 40 ? 
        "Delay harvesting if possible" : 
        "Continue regular harvesting schedule"
    }
  ];
};

// Function to get crop recommendations based on weather
const getWeatherBasedCropRecommendations = (weather: WeatherData | null, forecast: ForecastData | null) => {
  if (!weather || !forecast) return null;

  const temp = weather.current.temperature;
  const precipitation = forecast.daily.precipitation_probability_max[0];
  const avgPrecipitation = forecast.daily.precipitation_probability_max.reduce((a, b) => a + b, 0) / 3;

  // Determine temperature category
  let tempCategory = 'moderate';
  if (temp < 20) tempCategory = 'cold';
  else if (temp > 30) tempCategory = 'hot';

  // Determine rainfall category
  let rainfallCategory = 'moderate';
  if (avgPrecipitation < 30) rainfallCategory = 'low';
  else if (avgPrecipitation > 60) rainfallCategory = 'high';

  return {
    temperature: {
      category: tempCategory,
      ...cropRecommendations.temperature[tempCategory]
    },
    rainfall: {
      category: rainfallCategory,
      ...cropRecommendations.rainfall[rainfallCategory]
    }
  };
};

const WeatherPage = () => {
  const [location, setLocation] = useState("Chennai");
  const [weather, setWeather] = useState<WeatherData | null>(fallbackWeatherData);
  const [forecast, setForecast] = useState<ForecastData | null>(fallbackForecastData);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [useFallback, setUseFallback] = useState(false);

  const fetchWeatherData = async () => {
    try {
      setLoading(true);
      setError(null);
      setUseFallback(false);

      // First, get coordinates for the location
      const geocodingResponse = await fetch(
        `https://geocoding-api.open-meteo.com/v1/search?name=${location}&count=1&language=en&format=json`
      );
      
      if (!geocodingResponse.ok) {
        throw new Error('Failed to get location coordinates');
      }
      
      const geocodingData = await geocodingResponse.json();
      
      if (!geocodingData.results || geocodingData.results.length === 0) {
        throw new Error('Location not found');
      }
      
      const { latitude, longitude, name } = geocodingData.results[0];

      // Fetch current weather
      const weatherResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,wind_speed_10m,weather_code&timezone=auto`
      );
      
      if (!weatherResponse.ok) {
        throw new Error('Failed to fetch current weather');
      }
      
      const weatherData = await weatherResponse.json();

      // Fetch forecast
      const forecastResponse = await fetch(
        `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&daily=weather_code,temperature_2m_max,temperature_2m_min,precipitation_probability_max&timezone=auto`
      );
      
      if (!forecastResponse.ok) {
        throw new Error('Failed to fetch forecast');
      }
      
      const forecastData = await forecastResponse.json();

      // Process weather data
      const processedWeather: WeatherData = {
        current: {
          temperature: weatherData.current.temperature_2m,
          relative_humidity: weatherData.current.relative_humidity_2m,
          wind_speed: weatherData.current.wind_speed_10m,
          weather_code: weatherData.current.weather_code
        },
        location: {
          name,
          latitude,
          longitude
        }
      };

      // Process forecast data
      const processedForecast: ForecastData = {
        daily: {
          time: forecastData.daily.time,
          temperature_2m_max: forecastData.daily.temperature_2m_max,
          temperature_2m_min: forecastData.daily.temperature_2m_min,
          weather_code: forecastData.daily.weather_code,
          precipitation_probability_max: forecastData.daily.precipitation_probability_max
        }
      };

      setWeather(processedWeather);
      setForecast(processedForecast);

      // Generate alerts based on weather conditions
      const newAlerts: Alert[] = [];
      if (weatherData.current.precipitation > 0.5) {
        newAlerts.push({
          event: "Rain Alert",
          description: "Rain expected. Consider adjusting outdoor farming activities."
        });
      }
      if (weatherData.current.temperature_2m > 35) {
        newAlerts.push({
          event: "Heat Alert",
          description: "High temperatures expected. Ensure proper irrigation and shading."
        });
      }
      setAlerts(newAlerts);

    } catch (err) {
      console.error('Error fetching weather data:', err);
      setError('Failed to fetch weather data. Using fallback data instead.');
      setUseFallback(true);
      setWeather(fallbackWeatherData);
      setForecast(fallbackForecastData);
      setAlerts([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWeatherData();
  }, []);

  const getWeatherAdvice = () => {
    if (!weather) return null;

    const temp = weather.current.temperature;
    const humidity = weather.current.relative_humidity;
    const weatherCode = weather.current.weather_code;
    const weatherInfo = weatherCodes[weatherCode];

    const advice = [];

    if (weatherInfo.description.toLowerCase().includes('rain')) {
      advice.push('Consider harvesting and selling perishable crops today');
      advice.push('Check drainage systems in your fields');
    }

    if (temp > 30) {
      advice.push('Increase watering frequency for sensitive crops');
      advice.push('Consider providing shade for young plants');
    }

    if (humidity > 80) {
      advice.push('Monitor for fungal diseases in susceptible crops');
      advice.push('Ensure proper ventilation in storage areas');
    }

    return advice;
  };

  const getBestSellingDays = () => {
    if (!forecast) return null;

    return forecast.daily.time.map((time, index) => ({
      date: time,
      maxTemp: forecast.daily.temperature_2m_max[index],
      minTemp: forecast.daily.temperature_2m_min[index],
      weatherCode: forecast.daily.weather_code[index],
      precipitation: forecast.daily.precipitation_probability_max[index]
    }))
    .filter(day => day.precipitation < 30 && day.maxTemp > 20)
    .slice(0, 3);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <Loader2 className="h-8 w-8 animate-spin text-agrogreen-600" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero */}
      <div className="bg-skyblue-100 py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <CloudSun className="h-12 w-12 mx-auto mb-4 text-skyblue-500" />
            <h1 className="text-3xl md:text-4xl font-bold mb-4">Weather & Farm Advisory</h1>
            <p className="mb-6 text-gray-600">
              Get real-time weather updates and personalized farming recommendations based on your location and crops.
            </p>
            
            {error && (
              <Alert className="mb-4 bg-yellow-50 border-yellow-100">
                <AlertTitle className="text-yellow-800">Note</AlertTitle>
                <AlertDescription className="text-yellow-700">
                  {error}
                </AlertDescription>
              </Alert>
            )}
            
            <form onSubmit={(e) => { e.preventDefault(); fetchWeatherData(); }} className="flex gap-2 max-w-md mx-auto">
              <div className="relative flex-grow">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input 
                  placeholder="Enter your location..." 
                  className="pl-9"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                />
              </div>
              <Button type="submit" variant="default">Update</Button>
            </form>
          </div>
        </div>
      </div>
      
      {/* Weather Content */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-xl font-semibold mb-6 flex items-center">
          <MapPin className="h-5 w-5 mr-2" /> Current Location: {weather?.location.name || location}
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <CardTitle>Current Weather</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-5 w-5 text-blue-600" />
                    <span>Temperature: {Math.round(weather?.current.temperature || 0)}°C</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Droplets className="h-5 w-5 text-blue-600" />
                    <span>Humidity: {Math.round(weather?.current.relative_humidity || 0)}%</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Wind className="h-5 w-5 text-blue-600" />
                    <span>Wind: {Math.round(weather?.current.wind_speed || 0)} km/h</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Cloud className="h-5 w-5 text-blue-600" />
                    <span>{weatherCodes[weather?.current.weather_code || 0]?.description || 'Unknown'}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-6">
              <CardHeader className="pb-2">
                <CardTitle className="flex items-center">
                  <Info className="h-5 w-5 mr-2 text-skyblue-500" /> Weather Alerts
                </CardTitle>
                <CardDescription>Important updates for your area</CardDescription>
              </CardHeader>
              <CardContent>
                {alerts.length > 0 ? (
                  alerts.map((alert, index) => (
                    <Alert key={index} className="bg-yellow-50 border-yellow-100 mb-4">
                      <AlertTitle className="text-yellow-800">{alert.event}</AlertTitle>
                      <AlertDescription className="text-yellow-700">
                        {alert.description}
                      </AlertDescription>
                    </Alert>
                  ))
                ) : (
                  <Alert className="bg-agrogreen-50 border-agrogreen-100">
                    <AlertTitle className="text-agrogreen-800">No Active Alerts</AlertTitle>
                    <AlertDescription className="text-agrogreen-700">
                      No severe weather alerts for your area at this time.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>
          
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Crop-Specific Advisory</CardTitle>
                <CardDescription>Personalized recommendations based on current and upcoming weather conditions</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {getCropAdvisories(weather, forecast).map((advisory, index) => (
                    <div key={index} className="p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3 mb-2">
                        <span className="text-2xl">{advisory.icon}</span>
                        <h3 className="font-semibold text-agrogreen-700">{advisory.crop}</h3>
                      </div>
                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <Sun className="h-5 w-5 text-yellow-500 mt-1" />
                          <div>
                            <h4 className="font-medium text-gray-800">Current Conditions:</h4>
                            <ul className="list-disc list-inside ml-6 text-gray-700">
                              {advisory.currentAdvice.map((advice, i) => (
                                <li key={i}>{advice}</li>
                              ))}
                            </ul>
                          </div>
                        </div>
                        <div className="flex items-start gap-2">
                          <Cloud className="h-5 w-5 text-blue-500 mt-1" />
                          <div>
                            <h4 className="font-medium text-gray-800">Upcoming Weather:</h4>
                            <p className="text-gray-700 ml-6">{advisory.upcomingAdvice}</p>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
            
            <Card className="mt-8">
              <CardHeader>
                <CardTitle>Weather-Based Crop Recommendations</CardTitle>
                <CardDescription>Suggested crops based on current and forecasted weather conditions</CardDescription>
              </CardHeader>
              <CardContent>
                {getWeatherBasedCropRecommendations(weather, forecast) && (
                  <div className="space-y-8">
                    {/* Temperature-based recommendations */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <Thermometer className="h-5 w-5 text-red-500" />
                        <h3 className="font-semibold text-lg">Temperature Recommendations ({weather?.current.temperature}°C)</h3>
                      </div>
                      <p className="text-gray-700 mb-4">{getWeatherBasedCropRecommendations(weather, forecast)?.temperature.advice}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {getWeatherBasedCropRecommendations(weather, forecast)?.temperature.crops.map((crop, index) => (
                          <div key={index} className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{crop.icon}</span>
                              <div>
                                <h4 className="font-medium">{crop.name}</h4>
                                <p className="text-sm text-gray-600">{crop.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Rainfall-based recommendations */}
                    <div>
                      <div className="flex items-center gap-2 mb-4">
                        <CloudRain className="h-5 w-5 text-blue-500" />
                        <h3 className="font-semibold text-lg">Rainfall Recommendations ({Math.round(forecast?.daily.precipitation_probability_max[0] || 0)}% chance)</h3>
                      </div>
                      <p className="text-gray-700 mb-4">{getWeatherBasedCropRecommendations(weather, forecast)?.rainfall.advice}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {getWeatherBasedCropRecommendations(weather, forecast)?.rainfall.crops.map((crop, index) => (
                          <div key={index} className="p-4 bg-gray-50 rounded-lg">
                            <div className="flex items-center gap-3">
                              <span className="text-2xl">{crop.icon}</span>
                              <div>
                                <h4 className="font-medium">{crop.name}</h4>
                                <p className="text-sm text-gray-600">{crop.description}</p>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Additional Resources */}
      <div className="bg-gray-50 py-12">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl font-bold mb-4">Weather Analytics</h2>
          <p className="mb-6 max-w-2xl mx-auto text-gray-600">
            Access detailed historical weather data and analytics to make better informed farming decisions.
          </p>
          <Button variant="outline" size="lg">
            View Historical Data
          </Button>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default WeatherPage;
