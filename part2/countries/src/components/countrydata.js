import Weather from "./weather";

const CountryData = ({country}) => {
  // console.log(country.latlng[0])
return(
  <div>
    <h1>{country.name.common}</h1>
    <div>Capital: {country.capital}</div>
    <div>Area: {country.area}</div>
    <h3>Languages:</h3>
    <ul>
      {Object.values(country.languages).map(language => <li key={language}>{language}</li>)}
    </ul>
    <img src={country.flags.png} alt={country.name.common}></img>
    <Weather lat={country.latlng[0]} lon={country.latlng[1]} countryName={country.name.common} />
  </div>
)
}

export default CountryData;