import Country from "./Country";

const FindCountries = ({ country, handleSearch }) => {
  if (country.length > 10)
    return <p>Too many matches, specify another filter</p>;

  if (country.length === 1) {
    return <Country  country={country[0]}/>
  }

  return (
    <div>
      {country.map((e) => (
        <p key={e.cca3}>{e.name.common} <button onClick={() => handleSearch(e.name.common)}>show</button></p>
      ))}
    </div>
  );
};

export default FindCountries;
