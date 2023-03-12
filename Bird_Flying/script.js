const score = document.querySelector('.score');
const startBtn = document.querySelector('.startBtn');
const gameArea = document.querySelector('.gameArea');
const gameMessage = document.querySelector('.gameMessage');

startBtn.addEventListener('click', start);
gameMessage.addEventListener('click', start);
document.addEventListener('keydown', pressOn);
document.addEventListener('keyup', pressOff);

let keys = {};
let bird = document.createElement('div'); //! 요소 생성
let wing = document.createElement('div');
let player = {
  x: 0,
  y: 0,
  speed: 2,
};

function start() {
  console.info('abc');
  startBtn.classList.add('hide');
  gameMessage.classList.add('hide');
  bird.setAttribute('class', 'bird'); //! 생성된 요소에 속성 주입
  wing.setAttribute('class', 'wing');
  bird.appendChild(wing); //! bird에 wing 요소가 자식으로 붙는다.
  gameArea.appendChild(bird);
  player.x = bird.offsetLeft;
  player.y = bird.offsetTop;
  window.requestAnimationFrame(playGame);
}
function playGame() {
  if (keys.ArrowLeft) {
    player.x -= player.speed;
  }
  if (keys.ArrowRight) {
    player.x += player.speed;
  }
  if (keys.ArrowUp) {
    player.y -= player.speed;
  }
  if (keys.ArrowDown) {
    player.y += player.speed;
  }
  bird.style.left = player.x + 'px';
  bird.style.top = player.y + 'px';
  window.requestAnimationFrame(playGame);
}
function pressOn(e) {
  console.info('press on');
  keys[e.code] = true;
  console.info(keys);
}

function pressOff(e) {
  console.info('press Down');
  keys[e.code] = false;
  delete keys[e.code];
  console.info(keys);
}
