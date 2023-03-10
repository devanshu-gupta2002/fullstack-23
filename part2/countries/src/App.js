import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryData from './components/countrydata'
import Countries from './components/countries'

const App = () => {
const [value, setvalue] = useState('')
const [countries, setCountries] = useState([])
const [countriesToShow, setCountriesToShow] = useState(countries)



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
        (<div>Too many matches</div>) : (<Countries countriesToShow={countriesToShow} setCountriesToShow={setCountriesToShow} />)}
      </div>
  </div>
)
}
export default App;
