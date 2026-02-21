'use client';
import { useState } from 'react';
import WeatherEffects from './components/WeatherEffects';
import DigitalClock from './components/DigitalClock';

interface WeatherData {
  main: {
    temp: number;
    humidity: number;
  };
  weather: Array<{
    main: string;
    description: string;
  }>;
  name: string;
  cod: number;
}
//Weather DashBoard
export default function WeatherDashboard() {
  const [accentColor, setAccentColor] = useState('#00f3ff');
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [theme, setTheme] = useState('');
  
  const fetchWeather = async () => {
  if (!city) return;
  
  try {
    const res = await fetch(`/api/weather?city=${city}`);
    const data = await res.json();
    
    if (data.cod === 200) {
      setWeather(data);
      const mainWeather = data.weather[0].main.toLowerCase();
      setTheme(`weather-${mainWeather}`);
      const weatherMain = data.weather[0].main.toLowerCase();
    if (mainWeather === 'clear') {
      setAccentColor('#ffae00');
    } else if (mainWeather === 'thunderstorm') {
      setAccentColor('#be00ff');
    } else if (mainWeather.includes('rain') || mainWeather.includes('drizzle')) {
      setAccentColor('#0077ff');
    } else if (mainWeather === 'clouds' || mainWeather === 'mist' || mainWeather === 'haze') {
      setAccentColor('#94fbff');
    } else {
      //Default Color
      setAccentColor('#00f3ff');
    }  
    } 
    else {
      alert("CITY NOT FOUND IN DATABASE.");
    }
  } catch (err) {
    console.error("System Error:", err);
  }
  
};

  return (
    <div className={`main-wrapper ${theme}`}>
      <DigitalClock/>
      <WeatherEffects theme={theme} color={accentColor}/>
      {/* Scanline Effect */}
      <div className="scanline"></div>
      
      {/* Particle Canvas */}
      <canvas id="weather-canvas"></canvas>

      <div className="container">
        <h1 className="orbitron">NEURAL-WEATHER</h1>
        
        <div className="weather-card">
          <input 
            type="text" 
            placeholder="ENTER CITY..." 
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <button onClick={fetchWeather}>INITIALIZE SCAN</button>

          {weather && (
            <div className="weather-info">
              <p className="temp">{Math.round(weather.main.temp)}°C</p>
              <p style={{ color: 'var(--neon-main)', letterSpacing: '2px' }}>
                {weather.weather[0].description.toUpperCase()}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}