import { useState, useEffect } from 'react'
import axios from 'axios'

const App = () => {
const [value, setvalue] = useState('')
const [countries, setCountries] = useState([])
const [countriesToShow, setCountriesToShow] = useState(countries)
// const [message] = useState("Too many matches, specify filter")

useEffect(() => {
  axios
    .get(`https://restcountries.com/v3.1/all`)
    .then(response =>{
      setCountries(response.data)
    })
}, [])

// console.log(countries)

const searchValue = (event) => {
  const search=event.target.value
  setvalue(search)
  setCountriesToShow(
    countries.filter((country) => {
      return(country.name.official.toLowerCase().includes(search.toLowerCase()))
    })
  )
}
// console.log(countriesToShow)

const CountryData = ({country}) => {
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
  </div>
)
}

const Countries = ({countriesToShow}) => {
if(countriesToShow.length===1){return(null)}
  return(
  <div>
    {countriesToShow.map(country => <div key={country.name.official}>{country.name.common}{" "}</div>)}
  </div>
)
}

return(
  <div>
    <div>
      find countries: <input value = {value} onChange={searchValue} />  
      </div>
      <div>
        {countriesToShow.length === 1 ?
        <CountryData country={countriesToShow[0]} /> : null}
      </div>
      <div>{countriesToShow.length >=10 ?
        (<div>Too many matches</div>) : (<Countries countriesToShow={countriesToShow} />)}
      </div>
  </div>
)
}
export default App;
