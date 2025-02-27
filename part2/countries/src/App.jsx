import { useState, useEffect } from "react";
import axios from "axios";

const baseUrl = "https://studies.cs.helsinki.fi/restcountries/api";

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

const CountryDetails = ({ country }) => (
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
  </div>
);

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
