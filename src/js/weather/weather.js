import { getWeather } from '../api/weather';
import { refs } from '../refs/refs';
// const deg = document.querySelector('.weather__degree');
// const value = document.querySelector('.weather__value');
// const city = document.querySelector('.weather__city');
// const day = document.querySelector('.weather__day');
// const year = document.querySelector('.weather__year');
// const imgWeather = document.querySelector('.weather__image');

const fillWeather = async (deg, value, city, day, year, imgWeather) => {
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
  imgWeather.src = `https://openweathermap.org/img/wn/${currentWeather.weather.icon}@4x.png`;
  // console.log(currentWeather);
};
// function fillWeather() {
//   console.log(refs.deg)
//   const currentWeather = getWeather('London');
//   console.log(currentWeather.temp)
//   const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//   const months = [
//     'Jan',
//     'Feb',
//     'Mar',
//     'Apr',
//     'May',
//     'Jun',
//     'Jul',
//     'Aug',
//     'Sep',
//     'Oct',
//     'Nov',
//     'Dec',
//   ];
//   const date = new Date();
//   refs.deg.innerText = `${Math.round(currentWeather.temp)}°`;
//   refs.city.innerText = currentWeather.location;
//   refs.day.innerText = days[date.getDay()];
//   refs.year.innerText = `${date.getDate()} ${
//     months[date.getMonth()]
//   } ${date.getFullYear()}`;
//   refs.value.innerText = currentWeather.weather.type;
//   refs.imgWeather.src = `http://openweathermap.org/img/wn/${currentWeather.weather.icon}@4x.png`;
//   console.log(currentWeather);
// };

// fillWeather();
export { fillWeather };
