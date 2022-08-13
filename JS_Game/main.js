//캔버스 세팅
let canvas;
let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);

let backgroundImage, spaceshipImage, bulletImage, enemyImage, gameOverImage;

// 우주선 좌표
let spaceshipX = canvas.width / 2 - 30;
let spaceshipY = canvas.height - 60;

function loadImage() {
  backgroundImage = new Image();
  backgroundImage.src = "images/background.gif";

  spaceshipImage = new Image();
  spaceshipImage.src = "images/ship_icon.png";

  bulletImage = new Image();
  bulletImage.src = "images/bullet_icon.png";

  enemyImage = new Image();
  enemyImage.src = "images/ship_icon.png";

  gameOverImage = new Image();
  gameOverImage.src = "images/game_over.jpg";
}

let keysDown = {};
function setupKeyboardListener() {
  document.addEventListener("keydown", function (event) {
    keysDown[event.keyCode] = true;
    console.log("키다운객체에 들어간 값은?", keysDown);
  });

  document.addEventListener("keyup", function (event) {
    delete keysDown[event.keyCode];
    console.log("버튼 클릭후", keysDown);
  });
}

function update() {
  if (39 in keysDown) {
    spaceshipX += 5; // 우주선의 속도
  }
  if (37 in keysDown) {
    spaceshipX -= 5;
  }
  if (spaceshipX <= 0) {
    spaceshipX = 0;
  }
  if (spaceshipX >= canvas.width - 60) {
    spaceshipX = canvas.width - 60;
  }
}

function render() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);
}

function main() {
  update();
  render();
  requestAnimationFrame(main);
}

loadImage();
setupKeyboardListener();
main();
