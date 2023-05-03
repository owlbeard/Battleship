export class shipMaker {
  constructor(length, hit, coordinates, sunk) {
    this.length = length;
    this.hit = hit;
    this.sunk = sunk;
    this.coordinates = coordinates;
  }

  hit() {
    this.hit += 1;
    if (this.hit === this.length) sunk = true;
  }
}

export class enemyShipMaker {
  constructor(length, hit, coordinates, sunk) {
    this.length = length;
    this.hit = hit;
    this.sunk = sunk;
    this.coordinates = coordinates;
  }

  enemyHit() {
    this.hit += 1;
    if (this.hit === this.length) sunk = true;
  }
}
