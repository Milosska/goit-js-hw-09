import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

// Варіант 1

const inputEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const daysEl = document.querySelector('span[data-days]');
const hoursEl = document.querySelector('span[data-hours]');
const minutesEl = document.querySelector('span[data-minutes]');
const secondsEl = document.querySelector('span[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    console.log(selectedDates[0]);
  },
};
const calendar = flatpickr(inputEl, options);

let pickedTime;
let currentTime;
let intervalId = null;

disableBtn(startBtn);
calendar.config.onChange.push(onDataChange);
startBtn.addEventListener('click', onStartBtnClick);

function onDataChange() {
  pickedTime = calendar.selectedDates[0];
  const dateDifference = pickedTime - new Date();

  if (dateDifference <= 0) {
    disableBtn(startBtn);
    calendar.close();
    Notiflix.Notify.failure('Please choose a date in the future');
  } else {
    enableBtn(startBtn);
  }
}

function onStartBtnClick() {
  intervalId = setInterval(() => {
    currentTime = new Date();

    let timeDifference = pickedTime - currentTime;

    if (timeDifference < 0) {
      clearInterval(intervalId);
      return;
    }
    changeTimeInterface(convertMs(timeDifference));
  }, 1000);
}

function changeTimeInterface({ days, hours, minutes, seconds }) {
  daysEl.textContent = addLeadingZero(days);
  hoursEl.textContent = addLeadingZero(hours);
  minutesEl.textContent = addLeadingZero(minutes);
  secondsEl.textContent = addLeadingZero(seconds);
}

function disableBtn(btn) {
  btn.setAttribute('disabled', true);
}

function enableBtn(btn) {
  btn.removeAttribute('disabled');
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return value.toString().padStart(2, 0);
}

// Варіант 2

// const inputEl = document.querySelector('#datetime-picker');
// const startBtn = document.querySelector('button[data-start]');
// const intefaceParentEl = document.querySelector('.timer');
// const options = {
//   enableTime: true,
//   time_24hr: true,
//   defaultDate: new Date(),
//   minuteIncrement: 1,
//   onClose(selectedDates) {
//     console.log(selectedDates[0]);
//   },
// };
// const calendar = flatpickr(inputEl, options);

// let pickedTime;
// let currentTime;
// let intervalId = null;
// let timeArr = [];

// disableBtn(startBtn);
// calendar.config.onChange.push(onDataChange);
// startBtn.addEventListener('click', onStartBtnClick);

// function onDataChange() {
//   pickedTime = calendar.selectedDates[0];
//   const dateDifference = pickedTime - new Date();

//   if (dateDifference <= 0) {
//     disableBtn(startBtn);
//     calendar.close();
//     Notiflix.Notify.failure('Please choose a date in the future');
//   } else {
//     enableBtn(startBtn);
//   }
// }

// function onStartBtnClick() {
//   intervalId = setInterval(() => {
//     currentTime = new Date();

//     if (pickedTime - currentTime < 0) {
//       clearInterval(intervalId);
//       return;
//     }

//     formTimeArray(currentTime, pickedTime);
//     changeTimeInterface();
//   }, 1000);
// }

// function formTimeArray(startDate, endDate) {
//   const miliSecTime = endDate - startDate;

//   const days = Math.floor(miliSecTime / 86400000);
//   const hours = Math.floor((miliSecTime - days * 86400000) / 3600000);
//   const minutes = Math.floor(
//     (miliSecTime - (days * 86400000 + 3600000 * hours)) / 60000
//   );
//   const seconds = Math.floor(
//     (miliSecTime - (days * 86400000 + hours * 3600000 + minutes * 60000)) / 1000
//   );

//   timeArr.push(days, hours, minutes, seconds);
// }

// function changeTimeInterface() {
//   const array = intefaceParentEl.children;
//   for (i = 0; i < 4; i += 1) {
//     array[i].firstElementChild.textContent = timeArr[i]
//       .toString()
//       .padStart(2, 0);
//   }
//   timeArr = [];
// }

// function disableBtn(btn) {
//   btn.setAttribute('disabled', true);
// }

// function enableBtn(btn) {
//   btn.removeAttribute('disabled');
// }
