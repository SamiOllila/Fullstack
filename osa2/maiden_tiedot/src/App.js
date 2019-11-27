import React, { useState, useEffect } from 'react'
import axios from 'axios'


const SingleCountry = ({ country }) => {
  const { name, capital, population, languages, flag} = country
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
