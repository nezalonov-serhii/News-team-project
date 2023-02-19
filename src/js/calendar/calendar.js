let date = new Date();
let currentDate = date.getDate();
let month = date.getMonth();
let year = date.getFullYear();
let dateElement = document.querySelector('#calendar .calendar-days');
let monthInCalendar = document.querySelector('.mounth-year-display');
let daysInCalendar = document.querySelector('.calendar-week-days');
const singleBtn = document.querySelector('#choseDataButton');
const calendarContainer = document.querySelector('.container-calendar');
let monthNames = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

let dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

singleBtn.innerHTML = `${dateFix(currentDate)}/${dateFix(month + 1)}/${year}`;

// массив с правильным порядком дней недели в текущем месяце

function getFirstDayOfTheMonth() {
  let firstDayInChosenMonth = new Date(year, month, 1);
  let result = firstDayInChosenMonth.getDay();
  console.log(result);
  for (i = 0; i < result; i++) dayNames.unshift(dayNames.pop());
}

//рендр дней недели

function plotWeek() {
  let count = 0;
  daysInCalendar.innerHTML = '';
  for (let i = 0; i < dayNames.length; i++) {
    daysInCalendar.innerHTML += `<p class="calendar-week">${
      dayNames[count++]
    }</p>`;
  }
}

// получение и рендр чисел в текущем месяце

const getDays = (year, month) => {
  return new Date(year, month, 0).getDate();
};

function getNumberOfDates() {
  return getDays(date.getFullYear(), month + 1);
}

function plotDays() {
  let count = 1;
  dateElement.innerHTML = '';
  for (let i = 0; i < getNumberOfDates(); i++) {
    dateElement.innerHTML += `<button class="calendar-dates-day">${count++}</button>`;
  }
}

// кнопка открытия календаря

singleBtn.addEventListener('click', handleClick);

function handleClick() {
  calendarContainer.classList.toggle('container--active');
  updateRender();
  monthInCalendar.innerHTML = `${monthNames[month]} ${year}`;
}

// получение даты месяца по нажатию на число в календаре

let choosenDateButtons = document.querySelectorAll('.calendar-dates-day');

function addEventForDates() {
  choosenDateButtons.forEach(el => {
    el.addEventListener('click', e => {
      let currentBtn = e.currentTarget;
      calendarContainer.classList.toggle('container--active');
      singleBtn.innerHTML = `${dateFix(currentBtn.innerHTML)}/${dateFix(
        month + 1
      )}/${year}`;
    });
  });
}

// смена месяца кнопками

const preMonth = document.querySelector('#pre-month');
preMonth.addEventListener('click', decrementMonth);

const nextMonth = document.querySelector('#next-month');
nextMonth.addEventListener('click', incrementMonth);

function decrementMonth() {
  if (month > 0) {
    month -= 1;
  } else {
    month = 11;
    year -= 1;
  }
  updateRender();
}

function incrementMonth() {
  if (month < 11) {
    month += 1;
  } else {
    month = 0;
    year += 1;
  }
  updateRender();
}

function updateRender() {
  getFirstDayOfTheMonth();
  plotWeek();
  plotDays();
  choosenDateButtons = document.querySelectorAll('.calendar-dates-day');
  addEventForDates();
  monthInCalendar.innerHTML = `${monthNames[month]} ${year}`;
}

//фикс формата числа
function dateFix(e) {
  return (e + '').padStart(2, '0'); // добавляем 0 для чисел с одной цифрой
}
