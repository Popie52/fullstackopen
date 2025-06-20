import { useState, useEffect } from 'react'
import './index.css'
import Search from './components/Search';
import axios from 'axios';
import FindCountries from './components/FindCountries';
import countryService from './services/country.js';

function App() {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);
  const [searchCountry, setSearchCountry] = useState([]);

  useEffect(() => {
      countryService.getAll()
      .then(res => {
        setCountries(res);
      }).catch(err => console.log(err.message))
  }, [])


  useEffect(() => {
    if(search && countries.length > 0) {
      setSearchCountry(countries.filter(e => e.name.common.toLowerCase().includes(search.toLowerCase())))
    } else {
      setSearchCountry([]);
    }
  }, [search, countries])


  const handleChange = (e) => {
    setSearch(e.target.value);
  }

  return (
    <div>
      <Search msg={search} handleChange={handleChange}/>
      <FindCountries country={searchCountry} handleSearch={setSearch} />
    </div>
  )
}

export default App
