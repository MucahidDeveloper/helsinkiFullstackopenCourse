import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);

  useEffect(() => {
    axios
      .get("https://studies.cs.helsinki.fi/restcountries/api/all")
      .then((response) => setCountries(response.data))
      .catch((error) => console.log("Error fetching countries:", error));
  }, []);

  const handleSearchChange = (event) => {
    const query = event.target.value;
    setSearch(query);

    if (query) {
      const results = countries.filter((country) =>
        country.name.common.toLowerCase().includes(query.toLowerCase())
      );
      setFilteredCountries(results);
    } else {
      setFilteredCountries([]);
    }
  };

  const renderCountries = () => {
    if (filteredCountries.length > 10) {
      return <p>Too many matches, please refine your search.</p>;
    }
    if (filteredCountries.length > 1) {
      return (
        <ul>
          {filteredCountries.map((country) => (
            <li key={country.cca3}>{country.name.common}</li>
          ))}
        </ul>
      );
    }
    if (filteredCountries.length === 1) {
      const country = filteredCountries[0];
      return (
        <div>
          <h2>{country.name.common}</h2>
          <p>Capital: {country.capital}</p>
          <p>Area: {country.area}</p>
          <h3>Languages:</h3>
          <ul>
            {Object.values(country.languages).map((lang) => (
              <li key={lang}>{lang}</li>
            ))}
          </ul>
          <img
            src={country.flags.png}
            alt={`Flag of ${country.name.common}`}
            width="100"
          />
        </div>
      );
    }
    return null;
  };

  return (
    <div>
      <h1>Country Info</h1>
      <input
        type="text"
        value={search}
        onChange={handleSearchChange}
        placeholder="Search for a country..."
      />
      {renderCountries()}
    </div>
  );
};

export default App;
