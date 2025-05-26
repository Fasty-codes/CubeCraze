const timerDisplay = document.getElementById('timer');
const scrambleDisplay = document.getElementById('scramble');
const lastTimeDisplay = document.getElementById('last-time');
const startPauseBtn = document.getElementById('startPauseBtn');
const resetBtn = document.getElementById('resetBtn');

let startTime, interval, running = false;

const moves = ["R", "L", "U", "D", "F", "B"];
const modifiers = ["", "'", "2"];

function generateScramble(length = 20) {
  let scramble = [];
  let lastMove = "";

  while (scramble.length < length) {
    let move = moves[Math.floor(Math.random() * moves.length)];
    if (move !== lastMove) {
      lastMove = move;
      let modifier = modifiers[Math.floor(Math.random() * modifiers.length)];
      scramble.push(move + modifier);
    }
  }
  return scramble.join(" ");
}

function startTimer() {
  startTime = Date.now();
  interval = setInterval(() => {
    let elapsed = (Date.now() - startTime) / 1000;
    timerDisplay.textContent = elapsed.toFixed(2);
  }, 10);
}

function stopTimer() {
  clearInterval(interval);
  let finalTime = ((Date.now() - startTime) / 1000).toFixed(2);
  lastTimeDisplay.textContent = `Last time: ${finalTime}s`;
  scrambleDisplay.textContent = generateScramble();
}

function toggleTimer() {
  if (!running) {
    timerDisplay.textContent = "0.00";
    startTimer();
    startPauseBtn.textContent = "Pause";
  } else {
    stopTimer();
    startPauseBtn.textContent = "Start";
  }
  running = !running;
}

function resetTimer() {
  clearInterval(interval);
  timerDisplay.textContent = "0.00";
  lastTimeDisplay.textContent = "";
  scrambleDisplay.textContent = generateScramble();
  running = false;
  startPauseBtn.textContent = "Start";
}

// Controls
startPauseBtn.addEventListener("click", toggleTimer);
resetBtn.addEventListener("click", resetTimer);

// Keyboard support
document.body.addEventListener('keydown', (e) => {
  if (e.code === 'Space') {
    e.preventDefault();
    toggleTimer();
  }
});

// Initial scramble
scrambleDisplay.textContent = generateScramble();
