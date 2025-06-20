import { useState, useEffect } from "react";
import weatherService from "../services/weather";

const Country = ({country}) => {
    const languages = Object.values(country.languages);
    const [weather, setWeather] = useState(null);

    useEffect(() => {
        weatherService.getWeather(country.latlng[0], country.latlng[1])
        .then(res => {
            setWeather(res)
        })
        .catch(err => {
        console.error("Failed to fetch weather data:", err);
      });

    }, [country.latlng])

    if(!weather) return null;

    return (
        <div>
        <h1>{country.name.common}</h1>
        <p>Capital {country.capital}</p>
        <p>Area {country.area}</p>
        <h2>Languages</h2>
        <ul>
          {languages.map(lang => <li key={lang}>{lang}</li>)}
        </ul>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} width="150" />
        <h2>Weather in {country.capital[0]}</h2>
        <p>Temperature: {weather.main.temp} °C</p>

        <img src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt={`${weather.weather[0].description}`} width="150"/>
        
        <p>Wind {weather.wind.speed} m/s</p>
      </div>
    )
}


export default Country;