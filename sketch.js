var ship; // 이놈이 우주선이 될거에요.
var gate; // 이놈은 골인 지점이 될겁니다.
var goal_Sound; // 골인 했을 때, 사운드가 들어갈거에요.
var asteroids = []; // 장애물들이 될겁니다. 
var hidden_Ast_Array = []; // 얘네는 특수 장애물입니다 (기존 장애물 배열에 특수 장애물을 추가하면 서버가 큰일날거같아서 배열 하나더 추가함..)
var items = [];
var break_Sound; // 장애물과 우주선이 부딪혔을때 사운드가 출력되어야겠죠. 그 사운드를 담을겁니다.
let a = 0.0; // 아이템 박스의 늘,줄 효과를 위한 변수 1
let s = 0.0; // 위의 a 변수의 코사인 값을 토대로 아이템 박스의 크기를 계속 늘,줄 시키는 변수
var item_zen_Frame = 0;
var item_zen_Count = 0; // 아이템 젠 시간. 15초에 한번씩 아이템이 리젠됨.
var img;

function preload()
{
  /*
    preload() 함수는, setup() 함수 직전에 호출되는 함수입니다
    주로 "이미지, 사운드 등의 외부 파일"을 사전에 로드시킬때 사용합니다.
    preload() 함수로 외부 파일 사전 불러오기가 설정되면,
    setup() 함수는 불러오기 호출이 완료될 때까지 대기하게 됩니다.
  */

  goal_Sound = loadSound('sounds/goal_Sound.mp3');
  break_Sound = loadSound('sounds/break.mp3');
  displace_Sound = loadSound('sounds/stain_pan.mp3'); // 쓸 일이 있을지 없을지 결정이 안서서 일단은 더미데이터로 남겨두는 걸로
}

function setup() // 선언부
{
  frameRate(60);
  createCanvas(displayWidth, windowHeight);
  ship = new Ship(1); // 생성자
  gate = new Gate(); // 생성자를 통해 골인 지점을 맹글어주었어요

  for (var i = 0; i < 10; i++) // 처음에 생성되는 장애물은 10개.
  {
    asteroids.push(new Asteroid());
  }

  textSize(32);
  textAlign(LEFT);

  img = loadImage('images/pngegg.png');
}

function draw() // 출력부
{
  background(0);

  image(img, 50, 135, 80, 80);

  a = a + 0.065;
  s = cos(a) * 1;

  if (ship.isImmune) // 우주선이 무적 상태일 때,
  {
    ship.immuneFrame += 1;
    ship.immuneCount += (ship.immuneFrame % 60 == 0) ? 1 : 0; // 타이머가 증가. (60 프레임 = 1초.)

    if (ship.immuneCount <= 2) // 2초 동안 우주선은 렌더링되지 않음.
    {

    }
    else if (ship.immuneCount <= 5) // 2초 경과시 부터 3초 동안 우주선은 무적 상태로 렌더링.
    {
      ship.render();
      ship.turn();
      ship.update();
      ship.edges();
    }
    else // 그렇게 총 5초가 지나면
    {
      ship.switchImmune(); // 부활 및 무적시간이 만료되어 원래의 상태로 되돌아온다.
      ship.render();
      ship.turn();
      ship.update();
      ship.edges();
    }
  }
  else // 우주선이 무적 상태가 아닐 때.
  {
    ship.render();
    ship.turn();
    ship.update();
    ship.edges();
  }

  for (var i = 0; i < asteroids.length; i++) // 장애물들을 렌더링.
  {
    asteroids[i].render();
    asteroids[i].update();
    asteroids[i].edges();
  }

  if (ship.hits(gate)) // 우주선이 골인 지점에 닿았을 때.
  {
    goal_Sound.play();
    gate.blink();
  }

  for (var i = asteroids.length - 1; i >= 0; i--) // 모든 장애물들을 검사.
  {
    if (ship.hits_asteroid(asteroids[i])) // 우주선이 장애물에 닿았을 때.
    {
      if (ship.isImmune) // 우주선이 현재 무적상태라면
      { // 장애물만 두개로 갈라진다.
        if (asteroids[i].r > 30) // 장애물의 반지름이 30 이상일시
        { // 장애물이 두개로 갈라지며,
          var new_asteroids = asteroids[i].displaced();
          asteroids = asteroids.concat(new_asteroids);
        }
      }
      else // 우주선이 무적상태가 아니라면
      {
        break_Sound.play(); // 우주선 폭발 사운드를 출력하고
        if (asteroids[i].r > 30) // 장애물의 반지름이 30 이상일시
        { // 장애물이 두개로 갈라지며,
          var new_asteroids = asteroids[i].displaced();
          asteroids = asteroids.concat(new_asteroids);
        }
        ship.Score -= 4; // 점수가 까이고

        ship.switchImmune(); // 우주선은 무적 및 부활 상태로 변한다.
      }
      
      asteroids.splice(i, 1);
      break;
    }
  }

  // 장애물이 없어지면서 갯수가 3개 미만이 되면?
  if (asteroids.length < 3)
  {
    for (var i = 0; i < 8; i++)
    {
      asteroids.push(new Asteroid());
    }
  }

  if (item_zen_Count >= 15)
  {
    items.push(new Item_Box(random(0, 1)));

    item_zen_Frame = 0;
    item_zen_Count = 0;
  }
  else
  {
    // 
    item_zen_Frame += 1; 

    item_zen_Count += (item_zen_Frame % 60 == 0) ? 1 : 0;
  }

  for (var i = 0; i < items.length; i++)
  {
    items[i].render(s);
  }

  for (var i = items.length - 1; i >= 0; i--)
  {
    if (ship.get_item(items[i]))
    {
      // if (items[i].itemCode == 0)
      // {
      //   hidden_Ast_Array.push(new hidden_Ast(ship.code, items[i].itemCode));
      // }
      // else if (item[i].itemCode == 1)
      // {
      //   // ship.isStun = true;
      // }

      items.splice(i, 1);
      break;
    }
  }

  // for (var i = 0; i < hidden_Ast_Array.length; i++)
  // {
    
  // }
  

  // 플레이어가 기절 상태가 아니라면 : 방향키 입력시 움직인다

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
  // else, 플레이어가 기절 상태라면? 방향키를 입력해도 움직이지 않는다.


  gate.render();
  gate.turn();

  fill(255);
  text('Score : ' + ship.Score, 50, 30);
  fill(255);
  text('Immune : ' + ship.immuneCount, 50, 62);
  fill(255);
  text('Item : ' + item_zen_Count, 50, 94);
}
function keyReleased() // 키를 뗌
{
  ship.setRotation(0);
  ship.boosting(false); // 키를 뗐으니 배도 더이상 전진하지 않음.
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