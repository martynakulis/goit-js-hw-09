import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const startBtn = document.querySelector('button[data-start]');
const daysField = document.querySelector('span[data-days]');
const hoursField = document.querySelector('span[data-hours]');
const minutesField = document.querySelector('span[data-minutes]');
const secondsField = document.querySelector('span[data-seconds]');

startBtn.setAttribute('disabled', '');
let timerId = null;
let difference = 0;

function addLeadingZero(value) {
  if (value.length < 2) {
    return value.padStart(2, '0');
  }

  return value;
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

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    clearInterval(timerId);
    console.log(selectedDates[0]);
    difference = selectedDates[0].getTime() - options.defaultDate.getTime();

    if (selectedDates[0].getTime() < options.defaultDate.getTime()) {
      Notiflix.Notify.failure('Please choose a date in the future');
    } else {
      startBtn.removeAttribute('disabled', '');
    }
  },
};

startBtn.addEventListener('click', () => {
  startBtn.setAttribute('disabled', '');
  timerId = setInterval(() => {
    let date = convertMs(difference);
    const { days, hours, minutes, seconds } = date;
    daysField.textContent = addLeadingZero(days.toString());
    hoursField.textContent = addLeadingZero(hours.toString());
    minutesField.textContent = addLeadingZero(minutes.toString());
    secondsField.textContent = addLeadingZero(seconds.toString());
    difference -= 1000;
    if (difference <= 0) {
      clearInterval(timerId);
    }
  }, 1000);
});

const calendar = flatpickr('#datetime-picker', options);
