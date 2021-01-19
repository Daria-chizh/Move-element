import Goblin from '../img/goblin.png';

const possibleParents = document.querySelectorAll('.field');

const targetEl = document.createElement('img');
targetEl.src = Goblin;

function moveTargetToNewField() {
  const randomIndex = Math.floor(Math.random() * 15);
  const newParent = possibleParents[randomIndex];

  if (targetEl.parentNode === newParent) {
    moveTargetToNewField();
    return;
  }

  newParent.appendChild(targetEl);
}

moveTargetToNewField();

setInterval(moveTargetToNewField, 800);
