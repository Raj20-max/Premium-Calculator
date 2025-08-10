let screen =  document.getElementById("screen")
let buttons =  document.querySelectorAll(".calc-buttons button")
let screenValue = "";
let historyList = document.getElementById("history-list");
let history = [];

// Add sound effect
const clickAudio = new Audio('https://cdn.pixabay.com/audio/2022/03/15/audio_115b6b2b48.mp3');

for(let item of buttons){
  item.addEventListener("click", (e)=>{
    let buttonText = e.target.innerText;
    // Play sound
    clickAudio.currentTime = 0;
    clickAudio.play();
    // Animate button
    item.classList.add('btn-animate');
    setTimeout(() => item.classList.remove('btn-animate'), 150);
    // AC button clears everything
    if(buttonText === "AC"){
      screenValue = "";
      screen.value = "";
    }
    // Delete button removes last character
    else if(item.classList.contains("del-btn")){
      screenValue = screenValue.slice(0, -1);
      screen.value = screenValue;
    }
    // Clear button (C)
    else if(buttonText === "C"){
      screenValue = "";
      screen.value = "";
    }
    // Evaluate
    else if(buttonText === "="){
      try {
        let result = eval(screenValue);
        if (result === undefined || result === null || isNaN(result)) {
          screen.value = "Invalid Input";
        } else {
          screen.value = result;
          // Add to history
          history.unshift(screenValue + " = " + result);
          updateHistory();
          screenValue = result.toString();
        }
      } catch {
        screen.value = "Invalid Input";
      }
    }
    // Add input
    else {
      screenValue += buttonText;
      screen.value = screenValue;
    }
  })
}

// Add event listener for Clear History button
const clearHistoryBtn = document.getElementById("clear-history");
if (clearHistoryBtn) {
  clearHistoryBtn.addEventListener("click", () => {
    history = [];
    updateHistory();
  });
}

function updateHistory() {
  historyList.innerHTML = "";
  for(let entry of history.slice(0, 10)) {
    let li = document.createElement("li");
    li.textContent = entry;
    historyList.appendChild(li);
  }
}

// Theme toggle functionality
const themeToggle = document.querySelector('.theme-toggle');
const body = document.body;
let darkTheme = true;

function setTheme(dark) {
  if (dark) {
    body.classList.add('dark-theme');
    body.classList.remove('light-theme');
    themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
  } else {
    body.classList.add('light-theme');
    body.classList.remove('dark-theme');
    themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
  }
}
setTheme(true);

themeToggle.addEventListener('click', () => {
  darkTheme = !darkTheme;
  setTheme(darkTheme);
});