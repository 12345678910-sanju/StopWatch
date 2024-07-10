let startTime;
let updatedTime;
let difference;
let tInterval;
let running = false;
let lapCounter = 0;

const display = document.getElementById('display');
const startPauseBtn = document.getElementById('startPauseButton');
const resetBtn = document.getElementById('resetButton');
const lapBtn = document.getElementById('lapButton');
const laps = document.getElementById('laps');

startPauseBtn.addEventListener('click', () => {
    if (!running) {
        start();
    } else {
        pause();
    }
});

resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);

function start() {
    startTime = new Date().getTime() - (difference || 0);
    tInterval = setInterval(updateDisplay, 1);
    running = true;
    startPauseBtn.textContent = 'Pause';
}

function pause() {
    clearInterval(tInterval);
    running = false;
    startPauseBtn.textContent = 'Start';
}

function reset() {
    clearInterval(tInterval);
    running = false;
    startPauseBtn.textContent = 'Start';
    difference = 0;
    display.textContent = '00:00:00.000';
    laps.innerHTML = '';
    lapCounter = 0;
}

function lap() {
    if (running) {
        lapCounter++;
        const li = document.createElement('li');
        li.textContent = `Lap ${lapCounter}: ${display.textContent}`;
        laps.appendChild(li);
    }
}

function updateDisplay() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);
    const milliseconds = Math.floor((difference % 1000) / 1);
    display.textContent = `${pad(hours)}:${pad(minutes)}:${pad(seconds)}.${pad(milliseconds, 3)}`;
}

function pad(number, digits = 2) {
    return String(number).padStart(digits, '0');
}
