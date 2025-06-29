import axios from "axios";
const baseUrl = `https://studies.cs.helsinki.fi/restcountries/api/all`;
const searchUrl = `https://studies.cs.helsinki.fi/restcountries/api/name`;

const getAll = async () => {
  const response = await axios.get(baseUrl);
  return response.data;
};

const getCountry = async (name) => {
  try {
    const res = await axios.get(`${searchUrl}/${name}`);
    const country = res.data;

    return {
      found: true,
      data: {
        name: country.name.common,
        capital: country.capital?.[0] || "N/A",
        population: country.population,
        flag: country.flags.svg,
      },
    };
  } catch (error) {
    return { found: false };
  }
};

export default { getAll, getCountry };
