function Item_Box(code)
{
    this.pos = createVector(random(width), random(height));
    this.r = 40;
    // this.rotation = 0; 
    // this.heading = 0; // 회전한 정도.
    this.itemCode = code; // 아이템 코드를 생성자의 매개변수로 받아서 그 코드를 토대로 아이템을 구현.
    
    this.render = function(s)
    {
        push();
        translate(this.pos.x, this.pos.y);
        rectMode(CENTER);
        scale(s);
        stroke('#FFE062');
        strokeWeight(10);
        fill(220, 156, 52);
        square(0, 0, this.r);
        pop();
    }
}