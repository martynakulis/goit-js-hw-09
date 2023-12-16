const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

stopBtn.setAttribute('disabled', '');

let timerId = null;

startBtn.addEventListener('click', () => {
  startBtn.setAttribute('disabled', '');
  stopBtn.removeAttribute('disabled', '');
  timerId = setInterval(() => {
    body.style.backgroundColor = getRandomHexColor();
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  stopBtn.setAttribute('disabled', '');
  startBtn.removeAttribute('disabled', '');
  clearInterval(timerId);
});
