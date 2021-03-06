function Asteroid(pos, r)
{
    if (pos)
    {
        this.pos = pos.copy();
    }
    else
    {
        this.pos = createVector(random(width), random(height));
    }

    if(r)
    {
        this.r = r * 0.5;
    }
    else
    {
        this.r = random(15, 50);
    }

    this.vel = p5.Vector.random2D();
    this.total = floor(random(15, 50));
    this.offset = [];
    this.colorr = floor(random(10,255));
    this.colorg = floor(random(10,255));
    this.colorb = floor(random(10,255));

    for (var i = 0; i < this.total; i++)
    {
        this.offset[i] = random(-this.r * 0.5, this.r * 0.5);
    }

    this.update = function()
    {
        this.pos.add(this.vel);
    }

    this.render = function() 
    {
        push();
        fill(this.colorr, this.colorg, this.colorb);
        stroke(255);
        translate(this.pos.x, this.pos.y);
        beginShape();

        for (var i = 0; i < this.total; i++)
        {
            var angle = map(i, 0, this.total, 0, TWO_PI);
            var r = this.r + this.offset[i];
            var x = r * cos(angle);
            var y = r * sin(angle);
            vertex(x, y);
        }
        endShape();
        pop();
    }

    this.displaced = function() // 장애물이 총으로 격추당하면 두개로 갈라지게 한다.
    {
        var newA = [];
        newA[0] = new Goal(this.pos, this.r);
        newA[1] = new Goal(this.pos, this.r);
        return newA;
    }

    this.edges = function() // 화면 밖으로 나가면 반대편에서 나타나게 됨.
    {
        if (this.pos.x > width + this.r)
        {
            this.pos.x = -this.r;
        }
        else if(this.pos.x < -this.r)
        {
            this.pos.x = width + this.r;
        }

        if (this.pos.y > height + this.r)
        {
            this.pos.y = -this.r;
        }
        else if (this.pos.y < -this.r)
        {
            this.pos.y = height + this.r;
        }
    }
}