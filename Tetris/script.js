// DOM
const playground = document.querySelector('.playground > ul');

// Setting
const GAME_ROWS = 20;
const GAME_COLS = 10;

// variables
let score = 0;
let duration = 500;
let downInterval;
let tempMovingItem;

const BLOCKS = {
  tree: [
    [
      [0, 0],
      [0, 1],
      [1, 0],
      [1, 1],
    ],
    [],
    [],
    [],
  ],
};

const movingItem = {
  type: 'tree',
  direction: 0,
  top: 0,
  left: 0,
};

init();

// functions

function init() {
  tempMovingItem = { ...movingItem }; // 이런 방식이면 movingItem의 원본을 안 건드릴 수 있다.
  for (let i = 0; i < GAME_ROWS; i++) {
    prependNewLine();
  }
  renderBlocks();
}

function prependNewLine() {
  const li = document.createElement('li');
  const ul = document.createElement('ul');
  for (let j = 0; j < GAME_COLS; j++) {
    const matrix = document.createElement('li');
    ul.prepend(matrix);
  }
  li.prepend(ul);
  playground.prepend(li);
}

function renderBlocks() {
  const { type, direction, top, left } = tempMovingItem;
  const movingBlocks = document.querySelectorAll('.moving');
  movingBlocks.forEach(moving => {
    moving.classList.remove(type, 'moving'); // 블록 이동 시 이전 블록 삭제
  });
  BLOCKS[type][direction].forEach(block => {
    const x = block[0] + left;
    const y = block[1] + top;
    const target = playground.childNodes[y] ? playground.childNodes[y].childNodes[0].childNodes[x] : 0;
    const isAvailable = checkEmprty(target);
    if (isAvailable) {
      target.classList.add(type, 'moving'); // 블록 화면에 나타내기 + 이동 시 위치 바뀜
    } else {
      tempMovingItem = { ...movingItem };

      // renderBlocks(); 이렇게만 하면 stack 꽉 찼다는 에러 발생
      setTimeout(() => {
        renderBlocks();
      }, 0);
      //   setTi
    }
  });
  movingItem.left = left;
}

function moveBlock(moveType, amount) {
  tempMovingItem[moveType] += amount;
  renderBlocks();
}

function checkEmprty(target) {
  if (!target) {
    return false;
  }
  return true;
}

// event handling
document.addEventListener('keydown', e => {
  switch (e.keyCode) {
    case 40:
      moveBlock('top', 1); // 화살표 down
      break;
    case 39:
      moveBlock('left', 1); // 화살표 right
      break;
    case 38:
      moveBlock('top', -1); // 화살표 up
      break;
    case 37:
      moveBlock('left', -1); // 화살표 left
      break;
    default:
      break;
  }
});
