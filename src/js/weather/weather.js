import { getWeather } from '../api/weather';
import { refs } from '../refs/refs';

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
};

export { fillWeather };
