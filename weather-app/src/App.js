import React, { useState, useEffect } from 'react';
import axios from 'axios';

function WeatherApp() {
  const [responseData, setResponseData] = useState(null);
  const [currentWeatherData, setCurrentWeatherData] = useState(null);
  const [todaysWeatherData, setTodaysWeatherData] = useState(null) 
  const [tomorrowsWeatherData, setTomorrowsWeatherData] = useState(null) 
  const [dayAfterTomorrowsWeatherData, setDayAfterTomorrowsWeather] = useState(null)
  // Using two states for this might be not the cleanest way to update state without triggering useEffect?
  const [userLocationInput, setUserLocationInput] = useState("");
  const [location, setLocation] = useState("")


  useEffect(() => {
    // Define the API URL
    const apiUrl = 'https://wttr.in/' + location + '?format=j1';
    console.log("Triggered")
    // Fetch weather data using Axios
    axios.get(apiUrl)
      .then(response => {
        console.log(apiUrl)
        setResponseData(response.data)
        const extractedData = extractWeatherData(response.data);
        setCurrentWeatherData(extractedData.currentWeather);
        setTodaysWeatherData(extractedData.todaysWeather)
        setTomorrowsWeatherData(extractedData.tomorrowsWeather)
        setDayAfterTomorrowsWeather(extractedData.dayAfterTomorrowsWeather)
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
      });
  }, [location]);

  console.log(responseData)

  function handleClick(event) {
    setLocation(userLocationInput)
  }

  function handleChange(event) {
    setUserLocationInput(event.target.value)
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
            Night: rawData.weather[0].hourly[7].weatherDesc[0].value, 
          },

          temperature: {
            Morning: rawData.weather[0].hourly[2].tempC, 
            Noon: rawData.weather[0].hourly[4].tempC,
            Evening: rawData.weather[0].hourly[6].tempC,
            Night: rawData.weather[0].hourly[7].tempC, 
          },
          precipitation: {
            Morning: rawData.weather[0].hourly[2].precipMM, 
            Noon: rawData.weather[0].hourly[4].precipMM,
            Evening: rawData.weather[0].hourly[6].precipMM,
            Night: rawData.weather[0].hourly[7].precipMM, 
          },
          humidity: {
            Morning: rawData.weather[0].hourly[2].humidity, 
            Noon: rawData.weather[0].hourly[4].humidity,
            Evening: rawData.weather[0].hourly[6].humidity,
            Night: rawData.weather[0].hourly[7].humidity, 
          }, 
          windSpeed: {
            Morning: rawData.weather[0].hourly[2].windspeedKmph, 
            Noon: rawData.weather[0].hourly[4].windspeedKmph,
            Evening: rawData.weather[0].hourly[6].windspeedKmph,
            Night: rawData.weather[0].hourly[7].windspeedKmph, 
          }, 
        },

        tomorrowsWeather: {
          weatherDescription: {
            Morning: rawData.weather[1].hourly[2].weatherDesc[0].value, 
            Noon: rawData.weather[1].hourly[4].weatherDesc[0].value,
            Evening: rawData.weather[1].hourly[6].weatherDesc[0].value,
            Night: rawData.weather[1].hourly[7].weatherDesc[0].value, 
          },

          temperature: {
            Morning: rawData.weather[1].hourly[2].tempC, 
            Noon: rawData.weather[1].hourly[4].tempC,
            Evening: rawData.weather[1].hourly[6].tempC,
            Night: rawData.weather[1].hourly[7].tempC, 
          },
          precipitation: {
            Morning: rawData.weather[1].hourly[2].precipMM, 
            Noon: rawData.weather[1].hourly[4].precipMM,
            Evening: rawData.weather[1].hourly[6].precipMM,
            Night: rawData.weather[1].hourly[7].precipMM, 
          },
          humidity: {
            Morning: rawData.weather[1].hourly[2].humidity, 
            Noon: rawData.weather[1].hourly[4].humidity,
            Evening: rawData.weather[1].hourly[6].humidity,
            Night: rawData.weather[1].hourly[7].humidity, 
          }, 
          windSpeed: {
            Morning: rawData.weather[1].hourly[2].windspeedKmph, 
            Noon: rawData.weather[1].hourly[4].windspeedKmph,
            Evening: rawData.weather[1].hourly[6].windspeedKmph,
            Night: rawData.weather[1].hourly[7].windspeedKmph, 
          }, 
        },

        dayAfterTomorrowsWeather: {
          weatherDescription: {
            Morning: rawData.weather[2].hourly[2].weatherDesc[0].value, 
            Noon: rawData.weather[2].hourly[4].weatherDesc[0].value,
            Evening: rawData.weather[2].hourly[6].weatherDesc[0].value,
            Night: rawData.weather[2].hourly[7].weatherDesc[0].value, 
          },

          temperature: {
            Morning: rawData.weather[2].hourly[2].tempC, 
            Noon: rawData.weather[2].hourly[4].tempC,
            Evening: rawData.weather[2].hourly[6].tempC,
            Night: rawData.weather[2].hourly[7].tempC, 
          },
          precipitation: {
            Morning: rawData.weather[2].hourly[2].precipMM, 
            Noon: rawData.weather[2].hourly[4].precipMM,
            Evening: rawData.weather[2].hourly[6].precipMM,
            Night: rawData.weather[2].hourly[7].precipMM, 
          },
          humidity: {
            Morning: rawData.weather[2].hourly[2].humidity, 
            Noon: rawData.weather[2].hourly[4].humidity,
            Evening: rawData.weather[2].hourly[6].humidity,
            Night: rawData.weather[2].hourly[7].humidity, 
          }, 
          windSpeed: {
            Morning: rawData.weather[2].hourly[2].windspeedKmph, 
            Noon: rawData.weather[2].hourly[4].windspeedKmph,
            Evening: rawData.weather[2].hourly[6].windspeedKmph,
            Night: rawData.weather[2].hourly[7].windspeedKmph, 
          }, 
        },
      }

    return weatherData
    ;
  };

  return (
    <div>
      <h1>Weather Data</h1>
      <input type="text" onChange={handleChange}></input>
      <h1>User input: {userLocationInput}</h1>
      <button onClick={handleClick}>Search</button>
      {/* Display simplified weather data */}
      {currentWeatherData && (
        <div>
          <h1>Current Weather Conditions</h1>
            <p>Location: {currentWeatherData.location}</p>          
            <p>Weather description: {currentWeatherData.weatherDescription}</p>
            <p>Temperature: {currentWeatherData.temperature} degrees C</p>
            <p>Precipitation: {currentWeatherData.precipitation}mm</p>
            <p>Humidity: {currentWeatherData.humidity}%</p>
            <p>Wind Speed: {currentWeatherData.windSpeed}km/h</p>

          <h1>Todays Weather</h1>
          <h1>Todays weather: Morning </h1>
            <p>Weather description: {todaysWeatherData.weatherDescription.Morning}</p>
            <p>Temperature: {todaysWeatherData.temperature.Morning} degrees C</p>
            <p>Precipitation: {todaysWeatherData.precipitation.Morning}mm</p>
            <p>Humidity: {todaysWeatherData.humidity.Morning}%</p>
            <p>Wind Speed: {todaysWeatherData.windSpeed.Morning}km/h</p>

          <h1>Todays weather: Noon </h1>
            <p>Weather description: {todaysWeatherData.weatherDescription.Noon}</p>
            <p>Temperature: {todaysWeatherData.temperature.Noon} degrees C</p>
            <p>Precipitation: {todaysWeatherData.precipitation.Noon}mm</p>
            <p>Humidity: {todaysWeatherData.humidity.Noon}%</p>
            <p>Wind Speed: {todaysWeatherData.windSpeed.Noon}km/h</p>
          
          <h1>Todays weather: Evening </h1>
            <p>Weather description: {todaysWeatherData.weatherDescription.Evening}</p>
            <p>Temperature: {todaysWeatherData.temperature.Evening} degrees C</p>
            <p>Precipitation: {todaysWeatherData.precipitation.Evening}mm</p>
            <p>Humidity: {todaysWeatherData.humidity.Evening}%</p>
            <p>Wind Speed: {todaysWeatherData.windSpeed.Evening}km/h</p>

          <h1>Todays weather: Night </h1>
            <p>Weather description: {todaysWeatherData.weatherDescription.Night}</p>
            <p>Temperature: {todaysWeatherData.temperature.Night} degrees C</p>
            <p>Precipitation: {todaysWeatherData.precipitation.Night}mm</p>
            <p>Humidity: {todaysWeatherData.humidity.Night}%</p>
            <p>Wind Speed: {todaysWeatherData.windSpeed.Night}km/h</p>
          
            <h1>Tomorrows Weather</h1>
          <h1>Tomorrows weather: Morning </h1>
            <p>Weather description: {tomorrowsWeatherData.weatherDescription.Morning}</p>
            <p>Temperature: {tomorrowsWeatherData.temperature.Morning} degrees C</p>
            <p>Precipitation: {tomorrowsWeatherData.precipitation.Morning}mm</p>
            <p>Humidity: {tomorrowsWeatherData.humidity.Morning}%</p>
            <p>Wind Speed: {tomorrowsWeatherData.windSpeed.Morning}km/h</p>

          <h1>Tomorrows weather: Noon </h1>
            <p>Weather description: {tomorrowsWeatherData.weatherDescription.Noon}</p>
            <p>Temperature: {tomorrowsWeatherData.temperature.Noon} degrees C</p>
            <p>Precipitation: {tomorrowsWeatherData.precipitation.Noon}mm</p>
            <p>Humidity: {tomorrowsWeatherData.humidity.Noon}%</p>
            <p>Wind Speed: {tomorrowsWeatherData.windSpeed.Noon}km/h</p>
          
          <h1>Tomorrows weather: Evening </h1>
            <p>Weather description: {tomorrowsWeatherData.weatherDescription.Evening}</p>
            <p>Temperature: {tomorrowsWeatherData.temperature.Evening} degrees C</p>
            <p>Precipitation: {tomorrowsWeatherData.precipitation.Evening}mm</p>
            <p>Humidity: {tomorrowsWeatherData.humidity.Evening}%</p>
            <p>Wind Speed: {tomorrowsWeatherData.windSpeed.Evening}km/h</p>

          <h1>Tomorrows weather: Night </h1>
            <p>Weather description: {tomorrowsWeatherData.weatherDescription.Night}</p>
            <p>Temperature: {tomorrowsWeatherData.temperature.Night} degrees C</p>
            <p>Precipitation: {tomorrowsWeatherData.precipitation.Night}mm</p>
            <p>Humidity: {tomorrowsWeatherData.humidity.Night}%</p>
            <p>Wind Speed: {tomorrowsWeatherData.windSpeed.Night}km/h</p>
          
          <h1>Day after tomorrow</h1>
          <h1>Day after tomorrow: Morning </h1>
            <p>Weather description: {dayAfterTomorrowsWeatherData.weatherDescription.Morning}</p>
            <p>Temperature: {dayAfterTomorrowsWeatherData.temperature.Morning} degrees C</p>
            <p>Precipitation: {dayAfterTomorrowsWeatherData.precipitation.Morning}mm</p>
            <p>Humidity: {dayAfterTomorrowsWeatherData.humidity.Morning}%</p>
            <p>Wind Speed: {dayAfterTomorrowsWeatherData.windSpeed.Morning}km/h</p>

          <h1>Day after tomorrow: Noon </h1>
            <p>Weather description: {dayAfterTomorrowsWeatherData.weatherDescription.Noon}</p>
            <p>Temperature: {dayAfterTomorrowsWeatherData.temperature.Noon} degrees C</p>
            <p>Precipitation: {dayAfterTomorrowsWeatherData.precipitation.Noon}mm</p>
            <p>Humidity: {dayAfterTomorrowsWeatherData.humidity.Noon}%</p>
            <p>Wind Speed: {dayAfterTomorrowsWeatherData.windSpeed.Noon}km/h</p>
          
          <h1>Day after tomorrow: Evening </h1>
            <p>Weather description: {dayAfterTomorrowsWeatherData.weatherDescription.Evening}</p>
            <p>Temperature: {dayAfterTomorrowsWeatherData.temperature.Evening} degrees C</p>
            <p>Precipitation: {dayAfterTomorrowsWeatherData.precipitation.Evening}mm</p>
            <p>Humidity: {dayAfterTomorrowsWeatherData.humidity.Evening}%</p>
            <p>Wind Speed: {dayAfterTomorrowsWeatherData.windSpeed.Evening}km/h</p>

          <h1>Day after tomorrow: Night </h1>
            <p>Weather description: {dayAfterTomorrowsWeatherData.weatherDescription.Night}</p>
            <p>Temperature: {dayAfterTomorrowsWeatherData.temperature.Night} degrees C</p>
            <p>Precipitation: {dayAfterTomorrowsWeatherData.precipitation.Night}mm</p>
            <p>Humidity: {dayAfterTomorrowsWeatherData.humidity.Night}%</p>
            <p>Wind Speed: {dayAfterTomorrowsWeatherData.windSpeed.Night}km/h</p>

        </div>
          
      )}
    </div>
  );
}

export default WeatherApp;
