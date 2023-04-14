const score = document.querySelector('.score');
const startBtn = document.querySelector('.startBtn');
const gameArea = document.querySelector('.gameArea');
const gameMessage = document.querySelector('.gameMessage');

startBtn.addEventListener('click', start);
gameMessage.addEventListener('click', start);
document.addEventListener('keydown', pressOn);
document.addEventListener('keyup', pressOff);

let keys = {};
// Player 좌표
let player = {
  x: 0,
  y: 0,
  speed: 5,
  score: 0,
  inplay: false,
};

function start() {
  player.inplay = true;
  player.score = 0;
  gameArea.innerHTML = '';
  startBtn.classList.add('hide');
  gameMessage.classList.add('hide');
  let bird = document.createElement('div'); //! 요소 생성
  let wing = document.createElement('div');
  bird.setAttribute('class', 'bird'); //! 생성된 요소에 속성 주입
  wing.setAttribute('class', 'wing');
  wing.pos = 15;
  wing.style.top = wing.pos + 'px';
  bird.appendChild(wing); //! bird에 wing 요소가 자식으로 붙는다.
  gameArea.appendChild(bird);
  player.x = bird.offsetLeft;
  player.y = bird.offsetTop;
  window.requestAnimationFrame(playGame);
}

function playGame() {
  if (player.inplay) {
    let bird = document.querySelector('.bird');
    let wing = document.querySelector('.wing');
    let move = false;
    if (keys.ArrowLeft && player.x > 0) {
      player.x -= player.speed;
      move = true;
    }
    if (keys.ArrowRight && player.x < gameArea.offsetWidth - bird.offsetWidth) {
      player.x += player.speed;
      move = true;
    }
    if ((keys.ArrowUp || keys.Space) && player.y > 0) {
      player.y -= player.speed * 2;

      move = true;
    }
    if (keys.ArrowDown && player.y < gameArea.offsetHeight - bird.offsetHeight) {
      player.y += player.speed;
      move = true;
    }

    if (move) {
      wing.pos = wing.pos === 15 ? 25 : 15;
      wing.style.top = wing.pos + 'px';
    }
    // 중력 구현
    player.y += player.speed;

    if (player.y > gameArea.offsetHeight) {
      playGameOver();
    }

    bird.style.left = player.x + 'px';
    bird.style.top = player.y + 'px';
    window.requestAnimationFrame(playGame);
    player.score++;
    score.innerText = 'SCORE : ' + player.score;
  }
}

function playGameOver() {
  player.inplay = false;
  gameMessage.classList.remove('hide');
  gameMessage.innerHTML = 'GAME OVER' + ' <br/> Score <br/> ' + player.score;
}

function pressOn(e) {
  keys[e.code] = true;
}

function pressOff(e) {
  keys[e.code] = false;
  delete keys[e.code];
}
