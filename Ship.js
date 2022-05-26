function Ship() {
    this.pos = createVector(width / 2, height / 2); // 화면의 중앙부터 시작하는 x,y 좌표 벡터.
    this.r = 20; // 
    this.heading = 0; // 
    this.rotation = 0; // 
    this.vel = createVector(0, 0); // 
    this.isBoosting = false; // 지금 우주선이 급발진을 하고 있는가?
  
    this.boosting = function(b) {
      this.isBoosting = b;
    }
  
    this.update = function() {
      if (this.isBoosting) {
        this.boost();
      }
      this.pos.add(this.vel);
      this.vel.mult(0.99);
    }
  
    this.boost = function() {
      var force = p5.Vector.fromAngle(this.heading);
      force.mult(0.1);
      this.vel.add(force);
    }
  
    // this.hits = function(asteroid) {
    //   var d = dist(this.pos.x, this.pos.y, asteroid.pos.x, asteroid.pos.y);
    //   if (d < this.r + asteroid.r) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // }
  
    this.render = function() {
      push();
      translate(this.pos.x, this.pos.y);
      rotate(this.heading + PI / 2);
      fill(255);
      triangle(-this.r, this.r, this.r, this.r, 0, -this.r); // x1, y1, x2, y2, x3, y3
      pop();
    }
  
    this.edges = function() {
      if (this.pos.x > width) {
        this.pos.x = width;
      } else if (this.pos.x < 0) {
        this.pos.x = 0;
      }
      if (this.pos.y > height) {
        this.pos.y = height;
      } else if (this.pos.y < 0) {
        this.pos.y = 0;
      }
    }
  
    this.setRotation = function(a) {
      this.rotation = a;
    }
  
    this.turn = function() {
      this.heading += this.rotation;
    }
  
  }