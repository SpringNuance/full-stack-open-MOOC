import React, { useState, useEffect } from 'react'
import axios from 'axios'


const Options = ({countries, setCountries}) => {
  if (countries.length > 10) {
      return (
        <p>
          Too many matches, specify another filter
        </p>
      )
  } else if (countries.length >= 2) {
      return (
        <ul>
          {countries.map((country, i) =>
            <li key={i}> {country.name} <button onClick={() => setCountries([country])}>show</button></li>
          )}
        </ul>
      )
  } else if (countries.length === 1){
      return (
        <CountriesFull country={countries[0]}/>
      )
  } else {
     return (
       <div></div>
     )
  }
}

const CountriesFull = ({country}) => {
  const [weather, setWeather] = useState([])

  useEffect(() => {
    const params = {
      access_key: process.env.REACT_APP_API_KEY,
      query: country.capital
    }

    axios.get('http://api.weatherstack.com/current', {params})
      .then(response => {
        const apiResponse = response.data;
        console.log(apiResponse)
        console.log(`Current temperature in ${apiResponse.location.name} is ${apiResponse.current.temperature}℃`);
        setWeather([apiResponse])
      }).catch(error => {
        console.log(error);
    })
  })
  console.log('hey',weather)

  const WeatherDisplay = ({weather, country}) => {
    const currentWeather = weather[0].current
    return (
      <>
      <h2>Weather in {country.capital}</h2>
      <p>temperature: {currentWeather.temperature}° Celcius</p>
      <img src={currentWeather.weather_icons[0]} alt="Weather icon"></img>
      <p>wind: {currentWeather.wind_speed} mph direction {currentWeather.wind_dir}</p>
      </>
    )
  }

    return (
      <div>
        <h1>{country.name}</h1>
        <p>capital: {country.capital}</p>
        <p>population: {country.population}</p>
        <h2>Spoken languages</h2>
        <ul>
          {country.languages.map(language => <li key={language.name}>{language.name}</li>)}
        </ul>
        <img src={country.flag} alt="Country flag" width = "300" height = "200"/>

        <div>{weather.length > 0 ? (<WeatherDisplay weather = { weather} country = {country}/>) : (<div></div>)}</div>
      </div>
    )

}



const App = () => {
  const [countries, setCountries] = useState([])
  const [filter, setFilter] = useState('')

  useEffect(() => {
    axios
      .get('https://restcountries.eu/rest/v2/all')
      .then(response => {
        console.log('promise fulfilled')
        setCountries(response.data)
      })
  }, [])

  const handleFilter = (event) => {
    event.preventDefault()
    console.log(event.target.value)
    setFilter(event.target.value)
  }

  const CountriesToShow = !filter ? [] : countries.filter(country => country.name.toLowerCase().includes(filter))
  console.log(CountriesToShow)
 
  return (
    <div>
      <p>
        find countries <input value={filter} onChange={handleFilter} />
      </p>
      <Options countries = {CountriesToShow} setCountries = {setCountries}/>
    
    </div>
  )
}

export default App