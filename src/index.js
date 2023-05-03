import { enemyShipMaker, shipMaker } from './modules/shipMaker';
import { placeShip } from './modules/placeShip';
import './styles/normalize-css.css';
import './styles/style.css';
import { hoverSelector } from './modules/hoverSelector';

const formContainer = document.querySelector('.formContainer');
const alliedForces = document.querySelector('.alliedForces');
const enemyForces = document.querySelector('.enemyForces');
const setForces = document.querySelector('.setForces');
const container = document.querySelector('.container');
const rotate = document.querySelector('#rotate');
const ready = document.querySelector('#ready');

let axis = 'x';
let shipsPlaced = 0;
let shipNumber = 4;
let ships = [];
let alliedCoords = [];
let enemyShips = [];
let enemyCoords = [];
let turn = false;

function boardMaker(n, container, type) {
  for (let i = 0; i < n ** 2; i++) {
    let div = document.createElement('div');
    div.classList.add('cell');
    div.setAttribute(type, i);
    container.append(div);
  }
}

let enemyShipOne = new enemyShipMaker(5, 0, [11, 12, 13, 14, 15], false);
let enemyShipTwo = new enemyShipMaker(4, 0, [48, 58, 68, 78], false);
let enemyShipThree = new enemyShipMaker(3, 0, [61, 71, 81], false);
let enemyShipFour = new enemyShipMaker(3, 0, [53, 54, 55], false);
let enemyShipFive = new enemyShipMaker(2, 0, [97, 98], false);
enemyShips.push(
  enemyShipOne,
  enemyShipTwo,
  enemyShipThree,
  enemyShipFour,
  enemyShipFive
);

boardMaker(10, alliedForces, 'data-index');
boardMaker(10, enemyForces, 'data-enemy');
boardMaker(10, setForces, 'data-set');

for (let i = 0; i < enemyShips.length; i++) {
  for (let n = 0; n < enemyShips[i].coordinates.length; n++) {
    let index = enemyShips[i].coordinates[n];
    enemyCoords.push(index);
    let cell = document.querySelector(`[data-enemy="${index}"]`);
    console.log(cell);
    cell.classList.add('enemyPlaced');
  }
}

let haveIt = [];

function uniqueNum(maxNr) {
  //Generate random number
  let random = (Math.random() * maxNr).toFixed();

  //Coerce to number by boxing
  random = Number(random);

  if (!haveIt.includes(random)) {
    haveIt.push(random);
    return random;
  } else {
    if (haveIt.length < maxNr) {
      //Recursively generate number
      return uniqueNum(maxNr);
    } else {
      console.log('No more numbers available.');
      return false;
    }
  }
}

const setForcesAll = Array.from(document.querySelectorAll('[data-set]'));
for (let i = 0; i < setForcesAll.length; i++) {
  setForcesAll[i].addEventListener('mouseover', function hover(e) {
    let index = e.target.getAttribute('data-set');
    let indexNumeric = Number(index);
    if (
      !setForcesAll[i].classList.contains('disabled') &&
      !setForcesAll[i].classList.contains('placed') &&
      shipsPlaced < 5
    ) {
      hoverSelector(axis, setForcesAll, shipNumber, indexNumeric);
    }
  });
}

for (let i = 0; i < setForcesAll.length; i++) {
  setForcesAll[i].addEventListener('click', (e) => {
    if (
      !setForcesAll[i].classList.contains('disabled') &&
      !setForcesAll[i].classList.contains('placed') &&
      shipsPlaced < 5
    ) {
      let selected = document.querySelectorAll('.selected');
      placeShip(setForcesAll, axis);
      shipsPlaced++;
      shipNumber--;
      if (shipsPlaced == 3) shipNumber += 1;
      let coordinates = [];
      for (let i = 0; i < selected.length; i++) {
        coordinates.push(selected[i].getAttribute('data-set'));
      }
      let newShip = new shipMaker(selected.length, 0, coordinates, false);
      ships.push(newShip);
    }
  });
}

rotate.addEventListener('click', () => {
  if (axis == 'x') axis = 'y';
  else axis = 'x';
});

ready.addEventListener('click', () => {
  if (shipsPlaced == 5) {
    let placed = Array.from(document.querySelectorAll('.placed'));
    for (let i = 0; i < placed.length; i++) {
      let index = placed[i].getAttribute('data-set');
      let cellSelector = document.querySelector(`[data-index="${index}"]`);
      cellSelector.classList.add('placed');
    }
    formContainer.classList.remove('opened');
    formContainer.classList.add('closed');
    container.classList.remove('backdrop-blur');
  } else {
    alert('Please place your ships properly!');
  }
});

function aIShoot() {
  let cellSelector = document.querySelector(`[data-index="${uniqueNum(99)}"]`);
  if (cellSelector.classList.contains('placed')) {
    cellSelector.classList.remove('placed');
    cellSelector.classList.add('hit');
  } else cellSelector.classList.add('miss');
}

const enemyForcesAll = Array.from(document.querySelectorAll('[data-enemy]'));
for (let i = 0; i < enemyForcesAll.length; i++) {
  enemyForcesAll[i].addEventListener('click', (e) => {
    let index = Number(e.target.getAttribute('data-enemy'));
    if (enemyCoords.includes(index)) {
      e.target.classList.add('hit');
    } else e.target.classList.add('miss');
    aIShoot();
  });
}
