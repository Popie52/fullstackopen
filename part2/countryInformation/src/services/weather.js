import axios from "axios";
const baseUrl = `https://api.openweathermap.org/data/2.5/weather?`
const apiKey = import.meta.env.VITE_API_KEY;

const getWeather = (lat, lang) => {
    const response = axios.get(`${baseUrl}lat=${lat}&lon=${lang}&appid=${apiKey}&units=metric`);
    return response.then(res => res.data);
}


export default { getWeather }