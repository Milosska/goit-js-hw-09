const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const bodyEl = document.querySelector('body');
let intervalId;

startBtn.addEventListener('click', onStartBtnClick);
stopBtn.addEventListener('click', onStopBtnClick);

function onStartBtnClick() {
  disableBtn(startBtn);
  enableBtn(stopBtn);

  intervalId = setInterval(() => {
    bodyEl.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopBtnClick() {
  disableBtn(stopBtn);
  enableBtn(startBtn);
  clearInterval(intervalId);
}

function disableBtn(btn) {
  btn.setAttribute('disabled', true);
}

function enableBtn(btn) {
  btn.removeAttribute('disabled');
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
