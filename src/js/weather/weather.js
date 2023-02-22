import { getWeather } from '../api/weather';
import { refs } from '../refs/refs';
// const deg = document.querySelector('.weather__degree');
// const value = document.querySelector('.weather__value');
// const city = document.querySelector('.weather__city');
// const day = document.querySelector('.weather__day');
// const year = document.querySelector('.weather__year');
// const imgWeather = document.querySelector('.weather__image');

// const fillWeather = async (deg, value, city, day, year, imgWeather) => {
//   const currentWeather = await getWeather('London');
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
//   deg.innerText = `${Math.round(currentWeather.temp)}°`;
//   city.innerText = currentWeather.location;
//   day.innerText = days[date.getDay()];
//   year.innerText = `${date.getDate()} ${
//     months[date.getMonth()]
//   } ${date.getFullYear()}`;
//   value.innerText = currentWeather.weather.type;
//   imgWeather.src = `http://openweathermap.org/img/wn/${currentWeather.weather.icon}@4x.png`;

//   // console.log(currentWeather);
// };

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

  return `<li id="weather" class="weather news__item location_weather">
  <div class="weather__position">
      <span class="weather__degree">${Math.round(currentWeather.temp)}°</span>
      <div class="weather__item">
        <span class="weather__value">${currentWeather.weather.type}</span>
        <p class="weather__location">
          <svg>
            <use href="./images/sprite.svg#location"></use>
          </svg>
          <span class="weather__city">${currentWeather.location}</span>
        </p>
      </div>
    </div>
    <img class="weather__image" src="http://openweathermap.org/img/wn/${
      currentWeather.weather.icon
    }@4x.png">
    <div class="weather__date">
      <p class="weather__day">${days[date.getDay()]}</p>
      <p class="weather__year">${date.getDate()} ${
    months[date.getMonth()]
  } ${date.getFullYear()}</p>
    </div>
    <a href="https://sinoptik.ua/" class="weather__link" target="_blank" rel="noreferrer noopener">weather for week</a>
  </li>`;

  // const date = new Date();
  // deg.innerText = `${Math.round(currentWeather.temp)}°`;
  // city.innerText = currentWeather.location;
  // day.innerText = days[date.getDay()];
  // year.innerText = `${date.getDate()} ${
  //   months[date.getMonth()]
  // } ${date.getFullYear()}`;
  // value.innerText = currentWeather.weather.type;
  // imgWeather.src = `http://openweathermap.org/img/wn/${currentWeather.weather.icon}@4x.png`;
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
