import { getWeather } from '../api/weather';
import { refs } from '../refs/refs';

const fillWeather = async ({ deg, value, city, day, year, imgWeather }) => {
  const KIEV_LATITUDE = 50.4333;
  const KIEV_LONGITUDE = 30.5166;

  const getCurrentWeather = async (lat, lon) => {
    try {
      const currentWeather = await getWeather(lat, lon);
      const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
      const months = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      const date = new Date();
      deg.innerText = `${Math.round(currentWeather.temp)}°`;
      city.innerText = currentWeather.location;
      day.innerText = days[date.getDay()];
      year.innerText = `${date.getDate()} ${
        months[date.getMonth()]
      } ${date.getFullYear()}`;
      value.innerText = currentWeather.weather.type;
      imgWeather.src = `https://openweathermap.org/img/wn/${currentWeather.weather.icon}@4x.png`;
    } catch (error) {
      console.log('Error: ' + error.message);
    }
  };

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      async position => {
        const lat = position.coords.latitude;
        const lon = position.coords.longitude;
        await getCurrentWeather(lat, lon);
      },
      async error => {
        console.log('Error: ' + error.message);
        await getCurrentWeather(KIEV_LATITUDE, KIEV_LONGITUDE);
      }
    );
  } else {
    await getCurrentWeather(KIEV_LATITUDE, KIEV_LONGITUDE);
  }
};

export { fillWeather };
