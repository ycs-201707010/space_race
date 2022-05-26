var ship; // 이놈이 우주선이 될거에요.

function setup() // 선언부
{
  createCanvas(windowWidth, windowHeight);
  ship = new Ship(); // 생성자
}

function draw() // 출력부
{
  background(0);
  ship.render();
  ship.turn();
  ship.update();
  ship.edges();

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