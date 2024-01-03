let timer;
let isRunning = false;
let startTime;
let laps = [];

function startStopwatch() {
    if (!isRunning) {
        startTime = new Date().getTime();
        timer = setInterval(updateDisplay, 1000);
        isRunning = true;
    }
}

function pauseStopwatch() {
    if (isRunning) {
        clearInterval(timer);
        isRunning = false;
    }
}

function resetStopwatch() {
    clearInterval(timer);
    isRunning = false;
    document.getElementById("display").textContent = "00:00:00";
    laps = [];
    updateLaps();
}

function updateDisplay() {
    const currentTime = new Date().getTime();
    const elapsedTime = currentTime - startTime;
    const formattedTime = formatTime(elapsedTime);
    document.getElementById("display").textContent = formattedTime;
}

function formatTime(milliseconds) {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    const hours = Math.floor(minutes / 60);

    const formattedHours = padTime(hours);
    const formattedMinutes = padTime(minutes % 60);
    const formattedSeconds = padTime(seconds);

    return `${formattedHours}:${formattedMinutes}:${formattedSeconds}`;
}

function padTime(time) {
    return time < 10 ? "0" + time : time;
}

function lap() {
    if (isRunning) {
        const lapTime = new Date().getTime() - startTime;
        const formattedLapTime = formatTime(lapTime);
        laps.push(formattedLapTime);
        updateLaps();
    }
}

function updateLaps() {
    const lapsList = document.getElementById("laps");
    lapsList.innerHTML = "";

    laps.forEach((lap, index) => {
        const lapItem = document.createElement("li");
        lapItem.textContent = `Lap ${index + 1}: ${lap}`;
        lapsList.appendChild(lapItem);
    });
}
