import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { weatherApiKey } from './config'


const WeatherIcon = ({ icon }) => {
  const [weatherIcon, setWeatherIcon] = useState(undefined)
  console.log(icon)

  useEffect(() => {
    axios
      .get(icon)
      .then(response => {
        console.log(response)
        setWeatherIcon(response)
      })
  },[])

  return (
    <div>
      {weatherIcon ? (
        <img src={weatherIcon} alt='Weather icon' height="50"/>
      ) : <div>Loading weather icon</div>}
    </div>
  )
}


const SingleCountry = ({ country }) => {
  const [weatherData, setWeatherData] = useState(undefined)
  const [weatherIcon, setWeatherIcon] = useState(undefined)

  const { name, capital, population, languages, flag} = country

  useEffect(() => {
    axios
      .get(`http://api.weatherstack.com/current?access_key=${weatherApiKey()}&query=${capital}`)
      .then(response => {
        console.log(response.data)
        setWeatherData(response.data)
      })

  }, [])
  console.log(weatherData)

  return (
    <div>
      <h2>{name}</h2>
      capital: {capital} <br/>
      population: {population}
      <h3>Languages:</h3>
      <ul>
        {languages.map(language => <li key={language.name}>{language.name}</li>)}
      </ul>
      <img src={flag} alt='Image of flag' height="200"/>
      {weatherData ? (
        <div>
          <h3>Weather in {capital}</h3>
          <p><b>Temperature: </b> {weatherData.current.temperature} Celsius</p>
          <WeatherIcon icon={weatherData.current.weather_icons[0]} />
          <p><b>Wind: </b> {weatherData.current.wind_speed} kph direction {weatherData.current.wind_dir}</p>
        </div>
      ) : <div>Loading weather information</div>}
    </div>
  )
}


const App = () => {
  const [countries, setCountries] = useState([])
  const [filteredCountries, setFilteredCountries] = useState([])
  const [input, setInput] = useState('')

  const handleInputChange = (event) => {
    filter(event.target.value)
    setInput(event.target.value)
  }

  const handleClick = (country) => {
    filter(country)
  }

  const filter = (searchString) => {
    const allFilteredCountries = countries.filter(country => country.name.toUpperCase().includes(searchString.toUpperCase()))
    setFilteredCountries(allFilteredCountries)
  }

  const getDataFromApi = async () => {
    const response = await axios.get('http://restcountries.eu/rest/v2/all')
    setCountries(response.data)
    setFilteredCountries(response.data)
  }

  useEffect(() => {
    getDataFromApi()
  }, [])


  return (
    <div>
      <form>
        <div>
          Find countries <input
            value={input}
            onChange={handleInputChange} />
        </div>
      </form>
      <div>
        {filteredCountries.length > 9 ? 'Too many countries.' :
          filteredCountries.length === 1 ? <SingleCountry country={filteredCountries[0]} /> :
            <ul>
              {filteredCountries.map(country => (<li key={country.name}>
                {country.name} 
                <button onClick={() => handleClick(country.name)} size="sm">
                  show
                </button>
              </li>
              ))}
            </ul>}
      </div>
    </div>
  )
}

export default App;
