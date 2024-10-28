import React, { useState } from 'react';
const Chatbot = ({ weatherData }) => {
    const [query, setQuery] = useState('');
    const [responses, setResponses] = useState([]);
    const handleInputChange = (e) => {
        setQuery(e.target.value);
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim() === '') return;
        const response = getResponse(query);
        setResponses([...responses, { user: query, bot: response }]);
        setQuery('');
    };
    const getResponse = (query) => {
        const lowerQuery = query.toLowerCase();
        if (lowerQuery.includes("temperature")) {
            return `The temperature in ${weatherData.name} is ${weatherData.main.temp} °C.`;
        } else if (lowerQuery.includes("humidity")) {
            return `The humidity in ${weatherData.name} is ${weatherData.main.humidity}%.`;
        } else if (lowerQuery.includes("weather")) {
            return `The weather is currently: ${weatherData.weather[0].description}.`;
        }else if (lowerQuery.includes("pressure")) {
            return `The Pressure is currently: ${weatherData.main.pressure} hPa`;
        }  
        else if (lowerQuery.includes("wind speed")) { 
            return `The wind speed is ${weatherData.wind.speed} m/s.`;
        } else if (lowerQuery.includes("location")) {
            return `You are in ${weatherData.name}, ${weatherData.sys.country}.`;
        } else {
            return "I'm sorry, The detail is not currently available.";
        }
    };
    return (
        <div className="chatbot-container">
            <h2>Anything Wanna Ask ?</h2>
            <div className="chatbox">
                {responses.map((response, index) => (
                    <div key={index}>
                        <p><strong>You:</strong> {response.user}</p>
                        <p><strong>Finest Bot:</strong> {response.bot}</p>
                    </div>
                ))}
            </div>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={query}
                    onChange={handleInputChange}
                    placeholder="Ask about the weather..."
                />
                <button type="submit">Ask</button>
            </form>
        </div>
    );
};
export default Chatbot;