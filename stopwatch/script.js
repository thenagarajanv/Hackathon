let startTime, updatedTime, difference = 0;
let interval;
let running = false;
let hours = 0, minutes = 0, seconds = 0, milliseconds = 0;
let previousLapTime = 0;
let laps = [];

const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');

const hrDis = document.getElementById('hours');
const minDis = document.getElementById('minutes');
const secDis = document.getElementById('seconds');
const millisecDis = document.getElementById('milliseconds');
const lapsList = document.getElementById('laps-list');

function startStopwatch() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        interval = setInterval(updateTime, 10);
        running = true;
    }
}

function pauseStopwatch() {
    if (running) {
        clearInterval(interval);
        running = false;
    }
}

function resetStopwatch() {
    clearInterval(interval);
    running = false;
    hours = 0; minutes = 0; seconds = 0; milliseconds = 0; difference = 0;
    previousLapTime = 0;
    updateDisplay();
    laps = [];
    lapsList.innerHTML = '';
}

function lapStopwatch() {
    if (running) {
        const currentLapTime = difference - previousLapTime;
        previousLapTime = difference;

        const lapMilliseconds = Math.floor((currentLapTime % 1000) / 10);
        const lapSeconds = Math.floor((currentLapTime / 1000) % 60);
        const lapMinutes = Math.floor((currentLapTime / (1000 * 60)) % 60);
        const lapHours = Math.floor((currentLapTime / (1000 * 60 * 60)) % 24);

        const lapTimeFormatted = formatTime(lapHours, lapMinutes, lapSeconds, lapMilliseconds);
        laps.push(lapTimeFormatted);
        displayLaps();
    }
}

function updateTime() {
    updatedTime = new Date().getTime();
    difference = updatedTime - startTime;

    milliseconds = Math.floor((difference % 1000) / 10);
    seconds = Math.floor((difference / 1000) % 60);
    minutes = Math.floor((difference / (1000 * 60)) % 60);
    hours = Math.floor((difference / (1000 * 60 * 60)) % 24);

    updateDisplay();
}

function updateDisplay() {
    hrDis.textContent = formatNumber(hours);
    minDis.textContent = formatNumber(minutes);
    secDis.textContent = formatNumber(seconds);
    millisecDis.textContent = formatNumber(milliseconds);
}

function displayLaps() {
    lapsList.innerHTML = '';
    laps.forEach((lap, index) => {
        const li = document.createElement('li');
        li.textContent = `Lap ${index + 1}: ${lap}`;
        lapsList.appendChild(li);
    });
}

function formatTime(h, m, s, ms) {
    return `${formatNumber(h)}:${formatNumber(m)}:${formatNumber(s)}.${formatNumber(ms)}`;
}

function formatNumber(num) {
    return num < 10 ? `0${num}` : num;
}

startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', lapStopwatch);
