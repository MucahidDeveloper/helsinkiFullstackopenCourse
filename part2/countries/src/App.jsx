import { useState, useEffect } from "react";
import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";
const weatherApiKey = import.meta.env.VITE_WEATHERAPIKEY;
console.log("API Key:", weatherApiKey);

const CountryList = ({ countries, handleShow }) => (
  <div>
    {countries.map((country) => (
      <div key={country.name.common}>
        {country.name.common}
        <button onClick={() => handleShow(country.name.common)}>show</button>
      </div>
    ))}
  </div>
);

const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    if (country.capital) {
      const capital = country.capital[0];
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${capital}&units=metric&appid=${weatherApiKey}`
        )
        .then((response) => setWeather(response.data))
        .catch((error) => console.log("Failed to fetch weather data", error));
    }
  }, [country.capital]);

  return (
    <div>
      <h2>{country.name.common}</h2>
      <p>Capital: {country.capital}</p>
      <p>Area: {country.area}</p>
      <h3>Languages:</h3>
      <ul>
        {Object.values(country.languages).map((language) => (
          <li key={language}>{language}</li>
        ))}
      </ul>
      <img
        src={country.flags.png}
        alt={`Flag of ${country.name.common}`}
        width="150"
      />
      {weather && (
        <div>
          <h3>Weather in {country.capital[0]}</h3>
          <p>Temperature: {weather.main.temp}°C</p>
          <p>Weather: {weather.weather[0].description}</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt={weather.weather[0].description}
          />
        </div>
      )}
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(null);

  useEffect(() => {
    if (search) {
      axios
        .get(`${baseUrl}/all`)
        .then((response) => {
          const filtered = response.data.filter((country) =>
            country.name.common.toLowerCase().includes(search.toLowerCase())
          );
          setCountries(filtered);
          if (filtered.length === 1) {
            setSelectedCountry(filtered[0]);
          } else {
            setSelectedCountry(null);
          }
        })
        .catch((error) => console.log("Failed to fetch countries", error));
    } else {
      setCountries([]);
      setSelectedCountry(null);
    }
  }, [search]);

  const handleSearchChange = (event) => {
    setSearch(event.target.value);
  };

  const handleShow = (name) => {
    const country = countries.find((c) => c.name.common === name);
    setSelectedCountry(country);
  };

  return (
    <div>
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Search for a country"
      />
      {selectedCountry ? (
        <CountryDetails country={selectedCountry} />
      ) : countries.length > 10 ? (
        <p>Too many matches, please specify another filter.</p>
      ) : (
        <CountryList countries={countries} handleShow={handleShow} />
      )}
    </div>
  );
};

export default App;
