import Goblin from "../img/goblin.png";

export default class GameField {
  constructor(listeners) {
    this.onHit = listeners.onHit;
    this.goblin = this.initGoblin();
    this.fields = this.initFields();
    // show goblin at the start
    this.moveGoblinToRandomField();
  }

  moveGoblinToRandomField() {
    const randomIndex = Math.floor(Math.random() * 15);
    const newParent = this.fields[randomIndex];
    if (this.goblin.parentNode === newParent) {
      this.moveGoblinToRandomField();
      return;
    }
    newParent.appendChild(this.goblin);
    this.fieldWithGoblin = newParent;
  }

  initGoblin() {
    const target = document.createElement('img');
    target.src = Goblin;
    return target;
  }

  initFields() {
    const fields = document.querySelectorAll('.field');

    for (const field of fields) {
      field.addEventListener('click', (event) => {
        const field = event.currentTarget;
        if (field === this.fieldWithGoblin) {
          this.goblin.remove();
          this.onHit();
        }
      });
    }

    return fields;
  }
}
