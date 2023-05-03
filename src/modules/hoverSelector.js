export function hoverSelector(axis, setForcesAll, shipNumber, index) {
  let indexString = String(index);
  let firstNum = indexString.charAt(0);
  let firstNumber = Number(firstNum);
  if (axis == 'x') {
    if (
      (index >= 10 && index + shipNumber < Number(`${firstNumber + 1}0`)) ||
      (index < 10 && index + shipNumber < 10)
    ) {
      let selected = document.querySelectorAll('.selected');
      for (let i = 0; i < selected.length; i++) {
        selected[i].classList.remove('selected');
      }
      for (let n = 0; n <= shipNumber; n++) {
        if (setForcesAll[index + n]) {
          if (
            setForcesAll[index + n].classList.contains('disabled') ||
            setForcesAll[index + n].classList.contains('placed')
          ) {
            let selected = document.querySelectorAll('.selected');
            for (let i = 0; i < selected.length; i++) {
              selected[i].classList.remove('selected');
            }
          } else setForcesAll[index + n].classList.add('selected');
        }
      }
    }
  }
  if (axis == 'y' && setForcesAll[index + shipNumber * 10]) {
    let selected = document.querySelectorAll('.selected');
    for (let i = 0; i < selected.length; i++) {
      selected[i].classList.remove('selected');
    }
    for (let n = 0; n <= shipNumber; n++) {
      if (
        setForcesAll[index + n * 10].classList.contains('disabled') ||
        setForcesAll[index + n * 10].classList.contains('placed')
      ) {
        let selected = document.querySelectorAll('.selected');
        for (let i = 0; i < selected.length; i++) {
          selected[i].classList.remove('selected');
        }
      } else {
        if (index > 9) {
          setForcesAll[index + n * 10].classList.add('selected');
        }
        if (index <= 9) {
          setForcesAll[index + n * 10].classList.add('selected');
        }
      }
    }
  }
}
