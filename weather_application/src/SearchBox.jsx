import * as React from 'react';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import "./SearchBox.css"
import { useState } from 'react';

export default function SearchBox({ updateInfo }) {
  let [city, setCity] = useState("");
  let [error, setError] = useState("");

  const API_URL = "http://api.openweathermap.org/data/2.5/weather";
  const API_KEY = "7b589338d5e60c8bc04c6804f15088d5";

  let getWeatherInfo = async () => {
    try {
      let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
      let jsonResponse = await response.json();

      if (jsonResponse.cod !== 200) {
        setError("No such city, try another.");
        return null;
      }

      let result = {
        city: city,
        temp: jsonResponse.main.temp,
        tempMin: jsonResponse.main.temp_min,
        tempMax: jsonResponse.main.temp_max,
        humidity: jsonResponse.main.humidity,
        feelsLike: jsonResponse.main.feels_like,
        weather: jsonResponse.weather[0].description,
      };
      setError(""); // clear any old error
      return result;
    } catch (error) {
      setError("Something went wrong. Please try again.");
      return null;
    }
  };

  let handleChange = (event) => {
    setCity(event.target.value);
  };

  let handleSubmit = async (event) => {
    event.preventDefault();
    let info = await getWeatherInfo();
    if (info) {
      updateInfo(info);
      setCity(""); // clear only after successful fetch
    }
  };

  return (
    <div className="SearchBox">
      <form onSubmit={handleSubmit}>
        <TextField 
          id="city" 
          label="City Name" 
          variant="outlined" 
          required  
          value={city} 
          onChange={handleChange} 
        />
        <br /><br />
        <Button variant="contained" type="submit">
          Search
        </Button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
