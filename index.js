// -----------------------------------------------------------------------------------------------------------------------------------------------------------------
const colorBlock = Array.from(document.querySelectorAll('.colorBlock'));
const rowBox_b = document.querySelector('.rowBox.b');
const colorGuess = document.querySelector('.rowBox.d h1');
const mainContainer = document.querySelector('.mainContainer');
const body = document.querySelector('body');
const streak = document.querySelector('.streak');
const blocker = document.querySelector('.blocker');
const overlay = document.querySelector('.overlay');
const messageBox = document.querySelector('.messageBox');
const resetBtn = document.querySelector('.resetBtn');
const switchBgBtn = document.querySelector('.switchBgBtn');
let correctColor = Number;

let streakCounter = 0;

function randomColor(block) {
  const r = Math.floor((Math.random() * 255) + 0);
  const g = Math.floor((Math.random() * 255) + 0);
  const b = Math.floor((Math.random() * 255) + 0);
  
  block.style.background = `rgb(${r},${g},${b})`;
  return;
}
function guessColor() {
  const r = Math.floor((Math.random() * 255) + 0);
  const g = Math.floor((Math.random() * 255) + 0);
  const b = Math.floor((Math.random() * 255) + 0);
  const ran = Math.floor((Math.random() * 7) + 0);
  
  colorGuess.innerHTML = `RGB(${r}, ${g}, ${b})`;
  colorBlock[ran].style.background = `rgb(${r}, ${g}, ${b})`;
  correctColor = ran + 1;
  colorBlock[ran].innerHTML = correctColor;
  
}

function generateColors() {
  for(let block of colorBlock) {
    block.style.transition = "0s";
    randomColor(block);
  }
  
  guessColor();
  
}

function revealAnswer() {
  for(let block of colorBlock) {
    block.style.transition = "0.3s ease";
    block.style.opacity = 0;
    if(block.innerHTML == correctColor) {
      block.style.opacity = 1;
    }
  }
}

function displayMessage(is, colorTxt, text) {
 if(is === 1) {
   messageBox.style.transition = "0.4s ease";
   messageBox.style.transform = "translateY(11vh)";
   messageBox.style.color = colorTxt;
   messageBox.style.opacity = 1;
   messageBox.querySelector('p').innerHTML = text;
 } else {
   messageBox.style.transition = "0.2s ease";
   messageBox.style.transform = "translateY(0)";
   messageBox.style.opacity = 0;
 }
 return;
}

function selectColor(block) {
  if(block.innerHTML == correctColor) {
    displayMessage(1, "#24f722", "Correct!");
    streakCounter ++;
    streak.innerHTML = `${streakCounter}`;
    blocker.style.transition = "0s";
    blocker.style.visibility = "visible";
    setTimeout(() => {
      generateColors();
      displayMessage(0, undefined, undefined);
      blocker.style.visibility = "hidden";
    }, 1000);
  } else {
    displayMessage(1, "red", "Wrong!");
    revealAnswer();
    blocker.style.visibility = "visible";
    overlay.style.visibility = "visible";
    setTimeout(() => {
      rowBox_b.style.color = "white";
      overlay.style.transition = "1s linear";
      overlay.style.opacity = 0.6;
      setTimeout(() => {
        displayMessage(0, undefined, undefined);
        resetBtn.style.visibility = "visible";
      }, 1000);
    }, 500);
    
  }
  return;
}

//Setup event listeners
activateBlocks();

resetBtn.addEventListener("click", () => {
  for(let block of colorBlock) {
    block.style.transition = "0s";
    block.style.opacity = 1;
  }
  
  guessColor();
  rowBox_b.style.color = "black";
  streakCounter = 0;
  streak.innerHTML = `${streakCounter}`;
  overlay.style.transition = "0s";
  resetBtn.style.transition = "0s";
  overlay.style.opacity = 0;
  blocker.style.visibility = "hidden";
  overlay.style.visibility = "hidden";
  resetBtn.style.visibility = "hidden";
})


let switchBg = 0;
switchBgBtn.addEventListener("click", () => {
  if(switchBg === 0) {
    mainContainer.style.transition = "0.6s ease";
    switchBgBtn.querySelector('i').style.transition = "0.6s ease";
    mainContainer.style.background = "#ffffff";
    switchBgBtn.querySelector('i').style.color = "hsl(186.6,25.9%,9%)";
    switchBg ++;
  } else {
    mainContainer.style.transition = "0.6s ease";
    switchBgBtn.querySelector('i').style.transition = "0.6s ease";
    mainContainer.style.background = "hsl(186.6,25.9%,9%)";
    switchBgBtn.querySelector('i').style.color = "#ffffff";
    switchBg --;
  }
})

//Add event listeners
function activateBlocks() {
  for(let block of colorBlock) {
    block.addEventListener("click", () => {
      selectColor(block);
    })
  }
}





//Generate colors
generateColors();


