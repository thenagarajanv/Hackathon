import React, { useState, useEffect } from 'react';
import axios from 'axios';
import sunny from '../sunny.jpg';
import rainy from '../rainy.jpg';
import cloud from '../cloudy.jpeg';
import back1 from '../cloud.jpeg';
import Chatbot from './chatbot'; 
import './Home.css';

const Home = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState('');
    const [chatVisible, setChatVisible] = useState(false); 
    const API_KEY = '4d8fb5b93d4af21d66a2948710284366';

    useEffect(() => {
        getCurrentLocationWeather();
    }, []);

    const fetchWeather = async (latitude, longitude) => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric`
            );
            setWeatherData(response.data);
            setError('');
        } catch (err) {
            setError('Unable to fetch weather data');
            setWeatherData(null);
        }
    };

    const getCurrentLocationWeather = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    fetchWeather(latitude, longitude);
                },
                () => {
                    setError('Geolocation not supported or permission denied');
                }
            );
        } else {
            setError('Geolocation not supported');
        }
    };

    const fetchWeatherByCity = async () => {
        if (!city) return;
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
            );
            setWeatherData(response.data);
            setError('');
        } catch (err) {
            setError('City not found');
            setWeatherData(null);
        }
    };

    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            fetchWeatherByCity();
        }
    };

    const getBackgroundImage = () => {
        if (!weatherData) return back1;
        if (weatherData.weather[0].description.includes('rain')) return rainy;
        if (weatherData.weather[0].description.includes('cloud')) return cloud;
        return sunny;
    };

    return (
        <div style={{
            backgroundImage: `url(${getBackgroundImage()})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat',
            height: '100vh',
            width: '100vw',
            overflow: 'hidden',
        }}>
            <div className="container text-center mt-5 fullscreen-background" style={{ color: 'black' }}>
                <h1 className="mb-4">Finest Weather's</h1>
                <div className="input-group">
                    <input
                        type="text"
                        className="form-control"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Enter city name"
                    />
                    <div className="input-group-append">
                        <button className="btn btn-primary" onClick={fetchWeatherByCity}>Get Weather</button>
                    </div>
                    <button className="btn btn-secondary ml-2" onClick={getCurrentLocationWeather}>Get Current Location Weather</button>
                </div>
                {error && <p className="text-danger">{error}</p>}
                {weatherData && (
                    <div className="weather-info mt-4">
                        <h2>{weatherData.name}, {weatherData.sys.country}</h2>
                        <p>Temperature: {weatherData.main.temp} °C</p>
                        <p>Humidity: {weatherData.main.humidity}%</p>
                        <p>Pressure: {weatherData.main.pressure} hPa</p>
                        <p>Wind Speed: {weatherData.wind.speed} m/s</p>
                        <p>Wind Direction: {weatherData.wind.deg}°</p>
                        <p>Coordinates: {weatherData.coord.lat}° N, {weatherData.coord.lon}° E</p>
                        <p>Cloudiness: {weatherData.clouds.all}%</p>
                    </div>
                )}
            </div>
            <div className="chatbot-icon" onClick={() => setChatVisible(!chatVisible)}>
                <img src="./src/chat.jpeg" alt="Chat" />
            </div>
            {chatVisible && <Chatbot weatherData={weatherData} />}
        </div>
    );
};

export default Home;
