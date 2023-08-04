import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WeatherApp() {
  const [responseData, setResponseData] = useState(null);
  const [weatherData, setWeatherData] = useState(null);
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    // Define the API URL
    const apiUrl = 'https://wttr.in/?format=j1';

    // Fetch weather data using Axios
    axios.get(apiUrl)
      .then(response => {
        setResponseData(response.data)
        const simplifiedData = extractWeatherData(response.data);
        setWeatherData(simplifiedData);
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  }, []);

  console.log(responseData)

  function handleChange(event) {
    setUserInput(event.target.value)
  }

  // Function to extract relevant information
  function extractWeatherData(rawData) {
    return {
      location: rawData.nearest_area[0].areaName[0].value,
      weatherDescription: rawData.current_condition[0].weatherDesc[0].value,
      temperature: rawData.current_condition[0].temp_C,
      precipitation: rawData.current_condition[0].precipMM,
      humidity: rawData.current_condition[0].humidity,
      windSpeed: rawData.current_condition[0].windspeedKmph
    };
  };

  return (
    <div>
      <h1>Weather Data</h1>
      <input type="text" onChange={handleChange}></input>
      <h1>User input: {userInput}</h1>
      {/* Display simplified weather data */}
      {weatherData && (
        <div>
          <h1>Current Weather Condition</h1>
            <p>Location: {weatherData.location}</p>          
            <p>Weather description: {weatherData.weatherDescription}</p>
            <p>Temperature: {weatherData.temperature} degrees C</p>
            <p>Precipitation: {weatherData.precipitation}mm</p>
            <p>Humidity: {weatherData.humidity}%</p>
            <p>Wind Speed: {weatherData.windSpeed}km/h</p>



          <h1>Weather forecasts</h1>
        </div>
      )}
    </div>
  );
}

export default WeatherApp;
