var ship; // 이놈이 우주선이 될거에요.
var gate; // 이놈은 골인 지점이 될겁니다.
var goal_Sound; // 골인 했을 때, 사운드가 들어갈거에요.

function preload()
{
  /*
    preload() 함수는, setup() 함수 직전에 호출되는 함수입니다
    주로 "이미지, 사운드 등의 외부 파일"을 사전에 로드시킬때 사용합니다.
    preload() 함수로 외부 파일 사전 불러오기가 설정되면,
    setup() 함수는 불러오기 호출이 완료될 때까지 대기하게 됩니다.
  */

  goal_Sound = loadSound('sounds/goal_Sound.mp3');
}

function setup() // 선언부
{
  createCanvas(displayWidth, windowHeight);
  ship = new Ship(); // 생성자
  gate = new Gate(); // 생성자를 통해 골인 지점을 맹글어주었어요

  textSize(32);
  textAlign(CENTER, CENTER);
}

function draw() // 출력부
{
  background(0);
  ship.render();
  ship.turn();
  ship.update();
  ship.edges();

  if (ship.hits(gate))
  {
    goal_Sound.play();
    gate.blink();
  }
  // 
  if (keyIsDown(68)) // 오른쪽 키를 누르면
  {
    ship.setRotation(0.1); // 배가 오른쪽으로 돌아감
  }
  
  if (keyIsDown(65)) // 왼쪽키를 누르면
  {
    ship.setRotation(-0.1); // 배가 왼쪽으로 돌아감
  }

  if (keyIsDown(87))
  {
    ship.boosting(true);
  }

  gate.render();
  gate.turn();

  fill(255);
  text('Score : ' + ship.Score, 80, 30);
}
function keyReleased() 
{
  ship.setRotation(0);
  ship.boosting(false);
}

// function keyPressed() 
// {
//   if (keyCode == 68) 
//   {
//     ship.setRotation(0.1);
//   } 
//   if (keyCode == 65) 
//   {
//     ship.setRotation(-0.1);
//   } 
//   if (keyCode == 74) 
//   {
//     ship.boosting(true);
//   }
// }