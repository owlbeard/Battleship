export function placeShip(setForcesAll, axis) {
  let selected = document.querySelectorAll('.selected');
  for (let i = 0; i < selected.length; i++) {
    selected[i].classList.add('placed');
    let index = selected[i].getAttribute('data-set');
    let indexNumeric = Number(index);
    let secondNum = index.charAt(1);
    let secondNumber = Number(secondNum);
    if (axis == 'x') {
      if (i == 0 && indexNumeric % 10 != 0) {
        setForcesAll[indexNumeric - 1].classList.add('disabled');
        if (setForcesAll[indexNumeric - 1 + 10])
          setForcesAll[indexNumeric - 1 + 10].classList.add('disabled');
        if (setForcesAll[indexNumeric - 1 - 10])
          setForcesAll[indexNumeric - 1 - 10].classList.add('disabled');
      }
      if (i == selected.length - 1) {
        if (
          setForcesAll[indexNumeric + 1] &&
          indexNumeric != 9 &&
          secondNumber != 9
        )
          setForcesAll[indexNumeric + 1].classList.add('disabled');
        if (
          setForcesAll[indexNumeric + 1 - 10] &&
          indexNumeric != 9 &&
          secondNumber != 9
        )
          setForcesAll[indexNumeric + 1 - 10].classList.add('disabled');
        if (
          setForcesAll[indexNumeric + 1 + 10] &&
          indexNumeric != 9 &&
          secondNumber != 9
        )
          setForcesAll[indexNumeric + 1 + 10].classList.add('disabled');
      }
      if (setForcesAll[indexNumeric + 10])
        setForcesAll[indexNumeric + 10].classList.add('disabled');
      if (setForcesAll[indexNumeric - 10])
        setForcesAll[indexNumeric - 10].classList.add('disabled');
    }
    if (axis == 'y') {
      if (indexNumeric == 0 || (indexNumeric > 9 && secondNumber == 0)) {
        setForcesAll[indexNumeric + 1].classList.add('disabled');
      } else if (indexNumeric == 9 || secondNumber == 9) {
        setForcesAll[indexNumeric - 1].classList.add('disabled');
      } else {
        setForcesAll[indexNumeric + 1].classList.add('disabled');
        setForcesAll[indexNumeric - 1].classList.add('disabled');
      }
      if (i == 0) {
        if (setForcesAll[indexNumeric - 10])
          setForcesAll[indexNumeric - 10].classList.add('disabled');
        if (
          setForcesAll[indexNumeric - 10 - 1] &&
          indexNumeric != 0 &&
          secondNumber != 0
        )
          setForcesAll[indexNumeric - 10 - 1].classList.add('disabled');
        if (
          setForcesAll[indexNumeric - 10 + 1] &&
          indexNumeric != 9 &&
          secondNumber != 9
        )
          setForcesAll[indexNumeric - 10 + 1].classList.add('disabled');
      } else if (i == selected.length - 1) {
        if (setForcesAll[indexNumeric + 10])
          setForcesAll[indexNumeric + 10].classList.add('disabled');
        if (
          setForcesAll[indexNumeric + 10 - 1] &&
          indexNumeric != 0 &&
          secondNumber != 0
        )
          setForcesAll[indexNumeric + 10 - 1].classList.add('disabled');
        if (
          setForcesAll[indexNumeric + 10 + 1] &&
          indexNumeric != 9 &&
          secondNumber != 9
        )
          setForcesAll[indexNumeric + 10 + 1].classList.add('disabled');
      }
    }
    selected[i].classList.remove('selected');
  }
}
