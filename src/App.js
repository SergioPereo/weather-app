import React, {useState, useEffect} from 'react';

import SearchAppBar from './components/navigation/SearchAppBar';
import Forecast from './components/weather/Forecast';

import Typography from '@mui/material/Typography';
import { ThemeProvider, useTheme, createTheme } from '@mui/material/styles';

import './App.css';
import axios from 'axios'

function App() {


  const OPEN_WEATHER_BASE_URL = "https://api.openweathermap.org/data/2.5/onecall"
  const RESERVEMOS_BASE_URL = "https://search.reservamos.mx/api/v2/places"
  const API_KEY = process.env.REACT_APP_API_KEY
  const [dailyWeather, setDailyWeather] = useState([])
  const [current, setCurrent] = useState(null)
  const [query, setQuery] = useState("")
  const [isQuering, setIsQuering] = useState(false)
  const [direction, setDirection] = useState("")

  const handleSearch = async () => {
    if(!isQuering){
      try{
        setIsQuering(true)

        const coords = await axios.get(RESERVEMOS_BASE_URL, {
          params: {
            q: query
          }
        })
        setDirection(`${coords.data[0].country}, ${coords.data[0].state}, ${coords.data[0].city_name}.`)
        const weather = await axios.get(OPEN_WEATHER_BASE_URL, {
          params: {
            lat: coords.data[0].lat,
            lon: coords.data[0].long,
            exclude: "hourly,minutely",
            units: "metric",
            appid: API_KEY
          }
        })
        setDailyWeather(weather.data.daily)
        setCurrent(weather.data.current)
        setIsQuering(false)
        console.log(coords.data[0])
        console.log(weather)
        console.log(weather.data)
      } catch(error){
        setIsQuering(false)
        console.log(error)
      }
    } else {
      console.log("Is quering... wait!")
    }
  }

  const handleKeyDown = (event) => {
    if(event.key === 'Enter'){
      if(query.length > 0){
        handleSearch()
      }
    }
  }

  const handleOnChange = (event) => {
    setQuery(event.target.value)
  }

  const darkTheme = createTheme({
    palette: {
      mode: 'dark',
    },
  });

  return (
    <div className="App">
      <ThemeProvider theme={darkTheme}>
        <SearchAppBar query={query} handleOnChange={handleOnChange} handleKeyDown={handleKeyDown} />
        <Typography variant="h5" gutterBottom component="div">
          {direction}
        </Typography>
        <Forecast current={current} dailyWeather={dailyWeather} />
      </ThemeProvider>
    </div>
  );
}

export default App;
