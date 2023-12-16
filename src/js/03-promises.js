import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const btn = document.querySelector('button');
const delayInput = document.querySelector('input[name=delay]');
const stepInput = document.querySelector('input[name=step]');
const amountInput = document.querySelector('input[name=amount]');

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}

const submitHandler = event => {
  event.preventDefault();

  const {
    elements: { delay, step, amount },
  } = event.currentTarget;

  let timeValue = Number(delayInput.value);
  let stepValue = Number(stepInput.value);
  let amountValue = Number(amountInput.value);

  for (let i = 1; i <= amountValue; i++) {
    createPromise(i, timeValue)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
    timeValue += stepValue;
  }
  btn.setAttribute('disabled', '');
  setTimeout(() => {
    btn.removeAttribute('disabled', '');
  }, timeValue + stepValue * amountValue);
};

form.addEventListener('submit', submitHandler);
