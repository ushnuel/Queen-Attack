const queenPositions = {};
const MSG_ERR = 0;
const MSG_INFO = 1;
const MSG_SUC = 2;
const displayMsg = (msg, type = MSG_INFO) => {
  const message = document.querySelector('.message p');
  let color = 'blue';
  switch (type) {
    case MSG_ERR:
      color = 'red';
      break;
    case MSG_INFO:
      color = 'blue';
      break;
    case MSG_SUC:
      color = 'green';
      break;
  }
  message.style.color = color;
  message.textContent = msg;
};
const length = (a, b) => (b > a ? b - a : a - b);
const isSameDiagonal = (a, b) => length(a.row, b.row) === length(a.col, b.col);
const canAttack = (a, b) =>
  a.row === b.row || a.col === b.col || isSameDiagonal(a, b);

const startApp = (callback) => {
  document.querySelectorAll('.table td').forEach((cell) => {
    cell.addEventListener('click', () => {
      callback(cell);
    });
  });
};

startApp((cell) => {
  const row = cell.parentElement.rowIndex;
  const col = cell.cellIndex;
  const backgroundColor = (row + col) % 2 === 1 ? 'black' : 'white';
  const isSelected = !cell.dataset.isSelected ? 'select' : '';
  const key = `row${row}col${col}`;

  if (isSelected && Object.keys(queenPositions).length >= 2) {
    displayMsg('maximum of two queens are allowed', MSG_ERR);
    return;
  }

  cell.style.background = isSelected ? 'red' : backgroundColor;
  cell.dataset.isSelected = isSelected;

  if (isSelected) {
    queenPositions[key] = { row, col };
  } else {
    delete queenPositions[key];
  }

  const len = Object.keys(queenPositions).length;
  switch (len) {
    case 0:
      displayMsg('Select two queen positions to play');
      return;
    case 1:
      displayMsg('Select another queen position to continue');
      return;
    case 2:
      const queens = Object.values(queenPositions);
      const msg = canAttack(queens[0], queens[1])
        ? 'the two queens can attack each other'
        : 'the two queens cannot attack each other';
      displayMsg(msg, MSG_SUC);
      return;
  }
});

displayMsg('select two queen positions to play');
