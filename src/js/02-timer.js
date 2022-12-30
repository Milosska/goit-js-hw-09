import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const inputEl = document.querySelector('#datetime-picker');
const startBtn = document.querySelector('button[data-start]');
const intefaceParentEl = document.querySelector('.timer');
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
let pickedDate;
let timeArr = [];

disableBtn(startBtn);
calendar.config.onChange.push(onDataChange);
startBtn.addEventListener('click', onStartBtnClick);

function onDataChange() {
  pickedDate = calendar.selectedDates[0];
  const dateDifference = pickedDate - new Date();

  if (dateDifference <= 0) {
    disableBtn(startBtn);
    calendar.close();
    Notiflix.Notify.failure('Please choose a date in the future');
  } else {
    enableBtn(startBtn);
  }
}

function onStartBtnClick() {
  const intervalId = setInterval(() => {
    const currentTime = new Date();
    formTimeArray(currentTime, pickedDate);
    interfaceTimeChange();
  }, 1000);
}

function disableBtn(btn) {
  btn.setAttribute('disabled', true);
}

function enableBtn(btn) {
  btn.removeAttribute('disabled');
}

function formTimeArray(startDate, endDate) {
  const miliSecTime = endDate - startDate;

  const days = Math.floor(miliSecTime / 86400000);
  timeArr.push(days);
  const hours = Math.floor((miliSecTime - days * 86400000) / 3600000);
  timeArr.push(hours);
  const minutes = Math.floor(
    (miliSecTime - (days * 86400000 + 3600000 * hours)) / 60000
  );
  timeArr.push(minutes);
  const seconds = Math.floor(
    (miliSecTime - (days * 86400000 + hours * 3600000 + minutes * 60000)) / 1000
  );
  timeArr.push(seconds);
}

function interfaceTimeChange() {
  const array = intefaceParentEl.children;
  for (i = 0; i < 4; i += 1) {
    array[i].firstElementChild.textContent = timeArr[i];
  }
  timeArr = [];
}
