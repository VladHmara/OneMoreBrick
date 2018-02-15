class Ball {
    constructor(x, y, sx, sy) {
        this.x = x;
        this.y = y;

        this.sx = sx;
        this.sy = sy;

        this.div = this.drawBall()
        this.moveBall();
    }

    static runBalls(sx, sy) {
        var spx = Ball.startPointX;
        var spy = Ball.startPointY;
        Ball.locker = true;
        Ball.arrowHide();
        var count = Ball.count;
        Ball.firstBall.sx = sx;
        Ball.firstBall.sy = sy;
        Ball.balls.push(Ball.firstBall);
        Ball.firstBall = null;
        count--;
        var interval1 = setInterval(function () {
            if (count <= 0)
                clearInterval(interval1);
            else {
                Ball.balls.push(new Ball(spx, spy, sx, sy));
                count--;
            }
        }, 1000 / Ball.speed);
        var interval2 = setInterval(function () {
            if (count <= 0 && Ball.balls.length == 0) {
                Box.drawBoxes();
                Ball.count++;
                Ball.locker = false;
                clearInterval(interval2);
            }
        }, 1000 / 60);
    }

    drawBall() {
        var d = document.createElement('div');
        d.style.position = 'absolute';
        d.style.left = this.x + 'px';
        d.style.top = this.y + 'px';
        d.style.width = 2 * Ball.r + 'px';
        d.style.height = 2 * Ball.r + 'px';
        d.style.backgroundColor = Ball.color;
        d.style.borderRadius = Ball.r + 'px';
        Ball.parent.appendChild(d);
        return d;
    }

    moveBall() {
        var ins = this;
        var interval = setInterval(function () {
            ins.x += ins.sx * Ball.speed;
            ins.y += ins.sy * Ball.speed;

            if (ins.x <= 0 || ins.x + 2 * Ball.r >= 698)
                ins.sx *= -1;

            if (ins.y <= 0)
                ins.sy *= -1;

            if (ins.y + 2 * Ball.r >= 900) {
                if (Ball.firstBall == null) {
                    ins.sx = 0;
                    ins.sy = 0;
                    ins.y = 898 - 2 * Ball.r;
                    Ball.setFirstBall(ins);
                }
                else {
                    Ball.parent.removeChild(ins.div);
                    clearInterval(interval);
                }
                Ball.balls.splice(Ball.balls.indexOf(ins), 1);
            }

            Box.collisions(ins);

            ins.div.style.left = ins.x + 'px';
            ins.div.style.top = ins.y + 'px';
        }, 1000 / 60)
    }

    static setFirstBall(ball) {
        Ball.firstBall = ball;
        Ball.startPointX = ball.x;
        Ball.startPointY = ball.y;
    }

    static setParent(parent) {
        Ball.parent = parent;
        parent.onmousemove = Ball.mouseMove;
        parent.onclick = Ball.mouseClick;
        parent.onmouseleave = Ball.arrowHide;
        parent.onmouseenter = Ball.arrowShow;
    }

    static mouseMove(e) {
        if (!Ball.locker) {
            Ball.arrowShow();
            arrow.style.left = Ball.startPointX + Ball.r - 3 + 'px';
            arrow.style.top = Ball.startPointY + Ball.r + 'px';

            var vx = e.pageX - 8 - (Ball.startPointX + Ball.r);
            var vy = e.pageY - 8 - (Ball.startPointY + Ball.r);
            var wv = Math.sqrt(Math.pow(vx, 2) + Math.pow(vy, 2));
            arrow.style.width = wv + 'px';

            var rad = Math.acos(vx / wv);
            arrow.style.transform = 'rotate(-' + rad + 'rad)';
            if (Math.acos(vy / wv) < 1.575) {
                Ball.arrowHide();
            }
        }
    }

    static arrowHide() {
        arrow.style.display = 'none';
    }

    static arrowShow() {
        if(!Ball.locker)
            arrow.style.display = 'flex';
    }

    static mouseClick(e) {
        if (!Ball.locker) {
            var vx = e.pageX - 8 - (Ball.startPointX + Ball.r);
            var vy = e.pageY - 8 - (Ball.startPointY + Ball.r);
            var sx = vx / (Math.abs(vx) + Math.abs(vy));
            var sy = vy / (Math.abs(vx) + Math.abs(vy));
            Ball.runBalls(sx, sy);
        }
    }
}

Ball.arrow = null;
Ball.balls = [];
Ball.locker = false;
Ball.parent = null;
Ball.firstBall = null;
Ball.startPointX = 678;
Ball.startPointY = 878;
Ball.r = 10;
Ball.speed = 10;
Ball.color = 'blue';
Ball.count = 1;