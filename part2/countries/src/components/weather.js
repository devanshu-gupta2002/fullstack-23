import { useState, useEffect } from "react"
import axios from "axios"

const Weather = ({lat, lon, countryName}) => {
    const api_key = process.env.REACT_APP_API_KEY
    const [weather, setWeather] = useState([])
    
    useEffect( () => {
    axios 
    .get(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${api_key}&units=metric`)
    .then(response => {
        setWeather(response.data)
    })
    }, [])
    // console.log(weather)

    return (
        <>
        {weather.main ? (
        <div>
            <h2>Weather in {countryName}</h2>
            <div>Temperture: {weather.main.temp}</div> 
            <img alt="weather icon" src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
            <div>Wind: {weather.wind.speed}</div>
        </div>
        ) : null}
        </>
    )
}

export default Weather;