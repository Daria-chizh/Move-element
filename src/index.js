import Goblin from '../img/goblin.png';

const possibleParents = document.querySelectorAll('.field');
const missElement = document.getElementById('lost');
const hitElement = document.getElementById('dead');

let missCount = 0;
let hitCount = 0;
let fieldWithGoblin = null;

let goblinHasBeenHitPreviousTurn = false;

const targetEl = document.createElement('img');
targetEl.src = Goblin;

function setHitCount(val) {
  hitCount = val;
  hitElement.textContent = val;
}

function setMissCount(val) {
  missCount = val;
  missElement.textContent = val;
}

function onFieldClick(event) {
  const field = event.target;
  if (field === fieldWithGoblin) {
    setHitCount(hitCount + 1);
    targetEl.remove();
    goblinHasBeenHitPreviousTurn = true;
  }
}

for (const field of possibleParents) {
  field.onclick = onFieldClick;
}

function moveTargetToNewField() {
  if (!goblinHasBeenHitPreviousTurn) {
    setMissCount(missCount + 1);
  }
  if (missCount >= 6) {
    setHitCount(0);
    setMissCount(0);
    alert('Вы проиграли');
  }

  goblinHasBeenHitPreviousTurn = false;

  const randomIndex = Math.floor(Math.random() * 15);
  const newParent = possibleParents[randomIndex];

  if (targetEl.parentNode === newParent) {
    moveTargetToNewField();
    return;
  }
  newParent.appendChild(targetEl);
  fieldWithGoblin = newParent;
}

moveTargetToNewField();

setInterval(moveTargetToNewField, 1000);
