import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WeatherApp() {
  const [responseData, setResponseData] = useState(null);
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [todaysWeatherData, setTodaysWeatherData] = useState(null) 
  const [userInput, setUserInput] = useState("");

  useEffect(() => {
    // Define the API URL
    const apiUrl = 'https://wttr.in/?format=j1';

    // Fetch weather data using Axios
    axios.get(apiUrl)
      .then(response => {
        setResponseData(response.data)
        const extractedData = extractWeatherData(response.data);
        setCurrentWeatherData(extractedData.currentWeather);
        setTodaysWeatherData(extractedData.todaysWeather)
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
    
    const weatherData = {
        currentWeather : {
          location: rawData.nearest_area[0].areaName[0].value,
          weatherDescription: rawData.current_condition[0].weatherDesc[0].value,
          temperature: rawData.current_condition[0].temp_C,
          precipitation: rawData.current_condition[0].precipMM,
          humidity: rawData.current_condition[0].humidity,
          windSpeed: rawData.current_condition[0].windspeedKmph
        },
          
        todaysWeather: {
          weatherDescription: {
            Morning: rawData.weather[0].hourly[2].weatherDesc[0].value, 
            Noon: rawData.weather[0].hourly[4].weatherDesc[0].value,
            Evening: rawData.weather[0].hourly[6].weatherDesc[0].value,
            Night: rawData.weather[0].hourly[8].weatherDesc[0].value, 
          },

          temperature: {
            Morning: rawData.weather[0].hourly[2].tempC, 
            Noon: rawData.weather[0].hourly[4].tempC,
            Evening: rawData.weather[0].hourly[6].tempC,
            Night: rawData.weather[0].hourly[8].tempC, 
          },
          precipitation: {
            Morning: rawData.weather[0].hourly[2].precipMM, 
            Noon: rawData.weather[0].hourly[4].precipMM,
            Evening: rawData.weather[0].hourly[6].precipMM,
            Night: rawData.weather[0].hourly[8].precipMM, 
          },
          humidity: {
            Morning: rawData.weather[0].hourly[2].humidity, 
            Noon: rawData.weather[0].hourly[4].humidity,
            Evening: rawData.weather[0].hourly[6].humidity,
            Night: rawData.weather[0].hourly[8].humidity, 
          }, 
          windSpeed: {
            Morning: rawData.weather[0].hourly[2].windspeedKmph, 
            Noon: rawData.weather[0].hourly[4].windspeedKmph,
            Evening: rawData.weather[0].hourly[6].windspeedKmph,
            Night: rawData.weather[0].hourly[8].windspeedKmph, 
          }, 
        },

        // tomorrowsWeather: {
        //   temperature: {
        //     Morning: null, 
        //     Noon: null,
        //     Evening: null,
        //     Night: null, 
        //   },
        //   precipitation: {
        //     Morning: null, 
        //     Noon: null,
        //     Evening: null,
        //     Night: null, 
        //   },
        //   humidity: {
        //     Morning: null, 
        //     Noon: null,
        //     Evening: null,
        //     Night: null, 
        //   }, 
        //   windSpeed: {
        //     Morning: null, 
        //     Noon: null,
        //     Evening: null,
        //     Night: null, 
        //   }, 
        // },

        // dayAfterTomorrowsWeather: {
        //   temperature: {
        //     Morning: null, 
        //     Noon: null,
        //     Evening: null,
        //     Night: null, 
        //   },
        //   precipitation: {
        //     Morning: null, 
        //     Noon: null,
        //     Evening: null,
        //     Night: null, 
        //   },
        //   humidity: {
        //     Morning: null, 
        //     Noon: null,
        //     Evening: null,
        //     Night: null, 
        //   }, 
        //   windSpeed: {
        //     Morning: null, 
        //     Noon: null,
        //     Evening: null,
        //     Night: null, 
        //   }, 
        // },
      }

    return weatherData
    ;
  };

  return (
    <div>
      <h1>Weather Data</h1>
      <input type="text" onChange={handleChange}></input>
      <h1>User input: {userInput}</h1>
      {/* Display simplified weather data */}
      {currentWeatherData && (
        <div>
          <h1>Current Weather Condition</h1>
            <p>Location: {currentWeatherData.location}</p>          
            <p>Weather description: {currentWeatherData.weatherDescription}</p>
            <p>Temperature: {currentWeatherData.temperature} degrees C</p>
            <p>Precipitation: {currentWeatherData.precipitation}mm</p>
            <p>Humidity: {currentWeatherData.humidity}%</p>
            <p>Wind Speed: {currentWeatherData.windSpeed}km/h</p>

          <h1>Weather forecasts</h1>
          <h1>Todays weather: Morning (06:00am)</h1>
            <p>Weather description: {todaysWeatherData.weatherDescription.Morning}</p>
            <p>Temperature: {todaysWeatherData.temperature.Morning} degrees C</p>
            <p>Precipitation: {todaysWeatherData.precipitation.Morning}mm</p>
            <p>Humidity: {todaysWeatherData.humidity.Morning}%</p>
            <p>Wind Speed: {todaysWeatherData.windSpeed.Morning}km/h</p>

          <h1>Todays weather: Noon (12:00pm)</h1>
            <p>Weather description: {todaysWeatherData.weatherDescription.Noon}</p>
            <p>Temperature: {todaysWeatherData.temperature.Noon} degrees C</p>
            <p>Precipitation: {todaysWeatherData.precipitation.Noon}mm</p>
            <p>Humidity: {todaysWeatherData.humidity.Noon}%</p>
            <p>Wind Speed: {todaysWeatherData.windSpeed.Noon}km/h</p>
          
        </div>
          
      )}
    </div>
  );
}

export default WeatherApp;
