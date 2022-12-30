import Notiflix from 'notiflix';

const formEl = document.querySelector('.form');
const submitBtnEl = document.querySelector('button[type="submit"]');
let params = {};

formEl.addEventListener('input', onImputChange);
submitBtnEl.addEventListener('click', onBtnClick);

function onImputChange(evt) {
  let parameter = evt.target.name;
  let value = evt.target.value;
  params[parameter] = Number(value);
}

function onBtnClick(evt) {
  evt.preventDefault();
  createPromiseCycle(params);
}

function createPromiseCycle({ delay, step, amount }) {
  for (let i = 0; i < amount; i += 1) {
    let promiseParams = {};
    promiseParams.position = i + 1;
    promiseParams.delay = delay + step * i;
    createPromise(promiseParams);
  }
}

function createPromise({ position, delay }) {
  const shouldResolve = Math.random() > 0.3;

  setTimeout(() => {
    const promise = new Promise((resolve, reject) => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    });

    return promise
      .then(({ position, delay }) => {
        Notiflix.Notify.success(`Fulfilled promise ${position} in ${delay}ms`);
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(`Rejected promise ${position} in ${delay}ms`);
      });
  }, 0);
}
