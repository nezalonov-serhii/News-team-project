import { getWeather } from '../api/weather';

const deg = document.querySelector('.weather__degree');
const value = document.querySelector('.weather__value');
const city = document.querySelector('.weather__city');
const day = document.querySelector('.weather__day');
const year = document.querySelector('.weather__year');
const imgWeather = document.querySelector('.weather__image');

const fillWeather = async () => {
  const currentWeather = await getWeather('London');
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
  imgWeather.src = `http://openweathermap.org/img/wn/${currentWeather.weather.icon}@4x.png`;
  console.log(currentWeather);
};

fillWeather();
