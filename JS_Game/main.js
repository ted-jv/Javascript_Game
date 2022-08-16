// 캔버스 세팅
let canvas;
let ctx;
canvas = document.createElement("canvas");
ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 700;
document.body.appendChild(canvas);

// 사용 사진들
let backgroundImage, spaceshipImage, bulletImage, enemyImage, gameOverImage;

// 우주선 좌표
let spaceshipX = canvas.width / 2 - 30;
let spaceshipY = canvas.height - 60;

// 총알 class 관련
let bulletList = [];

class Bullet {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.init = function () {
      this.x = spaceshipX + 18;
      this.y = spaceshipY;

      bulletList.push(this);
    };
    this.update = function () {
      this.y -= 7;
    };
  }
}

// 이미지 불러오기 함수
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

// key 이벤트 모음
let keysDown = {};

function setupKeyboardListener() {
  document.addEventListener("keydown", function (event) {
    keysDown[event.keyCode] = true;
    console.log("키다운객체에 들어간 값은?", keysDown);
  });

  document.addEventListener("keyup", function (event) {
    delete keysDown[event.keyCode];
    console.log("버튼 클릭후", keysDown);

    if (event.keyCode == 32) {
      createBullet(); // 총알 생성
    }
  });
}

// 총알 생성 함수
function createBullet() {
  console.log("총알생성!");
  let b = new Bullet(); // 총알 하나 생성
  b.init();
  console.log("총알리스트", bulletList);
}

// 업데이트 반영 함수
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
  // 우주선의 좌표값이 무한대로 업데이트가 아닌 백그라운드 사진 안에만 있게 하기 위함.

  // 총알의 y좌표 업데이트하는 함수 호출
  for (let i = 0; i < bulletList.length; i++) {
    bulletList[i].update();
  }
}

// 화면 그리기 함수
function render() {
  ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
  ctx.drawImage(spaceshipImage, spaceshipX, spaceshipY);

  for (let i = 0; i < bulletList.length; i++) {
    ctx.drawImage(bulletImage, bulletList[i].x, bulletList[i].y);
  }
}

function main() {
  update();
  render();
  requestAnimationFrame(main); // 이 덕분에 main() 함수가 무한으로 계속 돌아간다. -> 그림이 화면에 유지
}

loadImage();
setupKeyboardListener();
main(); // main() 함수는 requestAnimationFrame(main) 이 덕분에 계속 불려짐 / but 위의 두 함수는 페이지 열렸을 시 처음에만 작동
