import GameField from './GameField';

export default class GameController {
  constructor() {
    this.missElement = document.getElementById('lost');
    this.hitElement = document.getElementById('dead');
    this.hits = 0;
    this.misses = 0;
    this.hasGoblinBeenHitThisTurn = false;
  }

  start() {
    this.field = new GameField({ onHit: () => this.onGoblinHit() });
    setInterval(() => this.doTurn(), 500);
  }

  onGoblinHit() {
    this.hasGoblinBeenHitThisTurn = true;
    this.setHitCount(this.hits + 1);
  }

  setHitCount(val) {
    this.hits = val;
    this.hitElement.textContent = val;
  }

  setMissCount(val) {
    this.misses = val;
    this.missElement.textContent = val;
  }

  doTurn() {
    if (!this.hasGoblinBeenHitThisTurn) {
      this.setMissCount(this.misses + 1);
    }

    if (this.misses >= 6) {
      this.setHitCount(0);
      this.setMissCount(0);
      alert('Вы проиграли');
    }

    this.field.moveGoblinToRandomField();
    this.hasGoblinBeenHitThisTurn = false;
  }
}
