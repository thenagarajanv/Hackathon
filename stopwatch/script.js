let startTime, updatedTime, difference = 0;
let interval;
let running = false;
let hours = 0, minutes = 0, seconds = 0, milliseconds = 0;
let previousLapTime = 0;
let laps = [];
// Retrieve elements
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const hrDis = document.getElementById('hours');
const minDis = document.getElementById('minutes');
const secDis = document.getElementById('seconds');
const millisecDis = document.getElementById('milliseconds');
const lapsList = document.getElementById('laps-list');
// Load previous state from localStorage
loadState();
function startStopwatch() {
    if (!running) {
        startTime = new Date().getTime() - difference;
        interval = setInterval(updateTime, 10);
        running = true;
        saveState();
    }
}
function pauseStopwatch() {
    if (running) {
        clearInterval(interval);
        running = false;
        saveState();
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
    localStorage.removeItem('stopwatchState'); // Clear localStorage
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
        saveState();
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
// Save current state to localStorage
function saveState() {
    const state = {
        running,
        difference,
        laps,
        previousLapTime
    };
    localStorage.setItem('stopwatchState', JSON.stringify(state));
}
function loadState() {
    const savedState = JSON.parse(localStorage.getItem('stopwatchState'));
    if (savedState) {
        running = savedState.running || false;
        difference = savedState.difference || 0;
        laps = savedState.laps || [];
        previousLapTime = savedState.previousLapTime || 0;
        // Restore time values based on difference
        milliseconds = Math.floor((difference % 1000) / 10);
        seconds = Math.floor((difference / 1000) % 60);
        minutes = Math.floor((difference / (1000 * 60)) % 60);
        hours = Math.floor((difference / (1000 * 60 * 60)) % 24);
        updateDisplay();
        displayLaps();
        // Resume interval if stopwatch was running
        if (running) {
            startTime = new Date().getTime() - difference;
            interval = setInterval(updateTime, 10);
        }
    } else {
        // Initialize defaults if no saved state is found
        difference = 0;
        hours = 0;
        minutes = 0;
        seconds = 0;
        milliseconds = 0;
        laps = [];
        updateDisplay();
    }
}
// Event listeners
startBtn.addEventListener('click', startStopwatch);
pauseBtn.addEventListener('click', pauseStopwatch);
resetBtn.addEventListener('click', resetStopwatch);
lapBtn.addEventListener('click', lapStopwatch);









