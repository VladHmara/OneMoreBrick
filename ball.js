class Ball{
    constructor(x,y,sx,sy){
        this.x = x;
        this.y = y;

        this.sx = sx;
        this.sy = sy;

        this.div = this.drawBall()
        this.moveBall();
    }
    static moveBalls(sx,sy){// переименовать
        for (var i = 0; i < Ball.count; i++){
            if(Ball.firstBall == null)
                Ball.balls.push(new Ball(Ball.startPointX,Ball.startPointY,sx,sy));
            else {
                Ball.firstBall.sx = sx;
                Ball.firstBall.sy = sy;
                Ball.balls.push(Ball.firstBall);
                Ball.firstBall = null;
            }
        }

    }

    drawBall(){
        var d = document.createElement('div');
        d.style.position = 'absolute';
        d.style.left = this.x + 'px';
        d.style.top = this.y +'px';
        d.style.width = 2*Ball.r + 'px';
        d.style.height = 2*Ball.r + 'px';
        d.style.backgroundColor = Ball.color;
        d.style.borderRadius = Ball.r + 'px';
        Ball.parent.appendChild(d);
        return d;
    }

    moveBall(){
        var ins = this;
        setInterval(function(){
            ins.x += ins.sx * Ball.speed;
            ins.y += ins.sy * Ball.speed;

            ins.div.style.left = ins.x  + 'px';
            ins.div.style.top = ins.y + 'px';
        },1000/60)
    }

    static setFirstBall(ball){
        Ball.firstBall = ball;
        Ball.startPointX = ball.x;
        Ball.startPointY = ball.y;
    }
    static setParent(parent){
        Ball.parent = parent;
        parent.onmousemove = Ball.mouseMove;
        parent.onclick = Ball.mouseClick;
    }

    static mouseMove(e){

    }
    static mouseClick(e){
        console.log(e.layerX + ' ' + e.layerY);
        console.log((Ball.startPointX + Ball.r) + ' ' + (Ball.startPointY + Ball.r));
        var vx = e.layerX - (Ball.startPointX + Ball.r);
        var vy = e.layerY - (Ball.startPointY + Ball.r);
        console.log(vx + ' ' + vy);
        var sx = vx/(Math.abs(vx)+Math.abs(vy));
        var sy = vy/(Math.abs(vx)+Math.abs(vy));
        console.log(sx + ' ' + sy);
        Ball.moveBalls(sx,sy);
    }
}
Ball.balls = [];
Ball.locker = false;
Ball.parent = null;
Ball.firstBall = null;
Ball.startPointX = 678;
Ball.startPointY = 878;
Ball.r = 10;
Ball.speed = 1;
Ball.color = 'blue';
Ball.count = 1;