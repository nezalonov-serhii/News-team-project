const WEATHER_KEY = 'adbfcea561ee5005b6167772340c12ff';
const BASE_URL = 'https://api.openweathermap.org/data/2.5/weather?';

// async function getWeather(location) {
//   const weatherFetch = await fetch(
//     `${BASE_URL}units=metric&q=${location}&appid=${WEATHER_KEY}`
//   );
//   const weatherInfo = await weatherFetch.json();

//   return {
//     location: weatherInfo.name,
//     temp: weatherInfo.main.temp,
//     weather: {
//       type: weatherInfo.weather[0].description,
//       icon: weatherInfo.weather[0].icon,
//     },
//   };
// }
async function getWeather(latitude, longitude) {
  const weatherFetch = await fetch(
    `${BASE_URL}units=metric&lat=${latitude}&lon=${longitude}&appid=${WEATHER_KEY}`
  );
  const weatherInfo = await weatherFetch.json();

  return {
    location: weatherInfo.name,
    temp: weatherInfo.main.temp,
    weather: {
      type: weatherInfo.weather[0].description,
      icon: weatherInfo.weather[0].icon,
    },
  };
}
//getLocation('London')
export { getWeather };
