import { useState, useEffect } from 'react'
import Country from './services/countries';

const Filter = (props) => {
  return (<>
    Find countries <input value={props.value} onChange={props.onChange} />
  </>)
}

const FilteredItems = (props) => {
  if (props.items === null) {
    return <p>No match found.</p>;
  }

  if (props.items.length > 10) {
    return <p>Too many matches, specify another filter.</p>
  }

  if (props.items.length === 1) {
    return null
  }

  return (<div>
    {props.items.map(country => <CountryListItem key={country.cca2} country={country} handleSelection={props.handleSelection} />)}
  </div>)
}

const CountryListItem = ({ country, handleSelection }) => {
  return <p>{country.name.common}{' '}<button onClick={() => handleSelection(country.name.common)}>show</button></p>
}

const CountryDetail = ({ country }) => {
  return (<div>
    <h1>{country.name.common}</h1>
    <div>
      <p>capital: {country.capital}</p>
      <p>area: {country.area}</p>

      <strong>languages</strong>
      <ul>
        {Object.keys(country.languages).map((k) => <li key={k}>{country.languages[k]}</li>)}
      </ul>
      <img src={country.flags.png} alt={`${country.name.common}'s flag`} />
    </div>
  </div>)
}

const WeatherDetail = ({ weather }) => {
  if (weather === null) {
    return null;
  }
  return (<>
    <p>Temperature: {weather.main.temp} celsius</p>
    <img alt={weather.weather[0].description} src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} />
    <p>Wind: {weather.wind.speed} m/s</p>
  </>)
}

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filterValue, setFilterValue] = useState("");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    Country.getAll().then(data => setCountries(data));
  }, []);

  const filteredCountries = filterValue !== "" ? countries.filter((country) => {
    return country.name.common.toLowerCase().indexOf(filterValue.toLowerCase()) > -1
  }) : []

  // update only if `weather` is not set
  if (filteredCountries.length === 1 && weather === null) {
    const country = filteredCountries[0];
    Country.getWeather(country).then((w) => { console.log("weather function returned", w); setWeather(w) })
  }

  // if there are multiple results reset `weather`
  if (filteredCountries.length !== 1 && weather !== null) {
    setWeather(null);
  }

  const handleFilterChange = (e) => {
    setFilterValue(e.target.value);
  }

  const handleSelection = (country_name) => {
    setFilterValue(country_name);
  }

  return (<>
    <Filter value={filterValue} onChange={handleFilterChange} />
    <FilteredItems items={filteredCountries} handleSelection={handleSelection} />
    {filteredCountries.length === 1 &&
      <CountryDetail country={filteredCountries[0]} />}
    {weather !== null && <WeatherDetail weather={weather} />}
  </>)

}
export default App