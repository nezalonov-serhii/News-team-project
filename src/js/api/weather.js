const WEATHER_KEY = 'adbfcea561ee5005b6167772340c12ff';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?';

async function getWeather(location) {
  const weatherFetch = await fetch(
    `${BASE_URL}?units=metric&q=${location}&appid=${WEATHER_KEY}`
  );

  return weatherFetch.json();
}

export { getWeather };
