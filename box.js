class Box {
    constructor(x, type) {
        this.x = x;
        this.y = 0;
        this.type = type;
        this.life = Box.count;
        Box.boxes.push(this);
        this.div = this.drawBox();
    }

    static drawBoxes() {
        for (var i = 0; i < 7; i++) {
            if (Math.random() >= 0.5)
                if (Math.random() >= 0.5)
                    new Box(i, 0);
                else
                    new Box(i, Math.round(Math.random() * 3 + 1));
        }
        Box.moveBoxesDown();
        Box.count++;
    }

    drawBox() {
        var d = document.createElement('div');

        switch (this.type) {
            case 0:
                d.classList.add("square");
                break;
            case 1:
                d.classList.add("triangle");
                d.style.borderTop = 'solid 48px black';
                d.style.borderRight = 'solid 48px black';
                d.style.alignItems = "flex-end";
                break;
            case 2:
                d.classList.add("triangle");
                d.style.borderRight = 'solid 48px black';
                d.style.borderBottom = 'solid 48px black';
                break;
            case 3:
                d.classList.add("triangle");
                d.style.borderBottom = 'solid 48px black';
                d.style.borderLeft = 'solid 48px black';
                d.style.justifyContent = "flex-end";
                break;
            case 4:
                d.classList.add("triangle");
                d.style.borderLeft = 'solid 48px black';
                d.style.borderTop = 'solid 48px black';
                d.style.justifyContent = "flex-end";
                d.style.alignItems = "flex-end";
                break;
        }
        d.style.left = this.x * 100 + 1 + 'px';
        d.innerHTML = this.life;
        Box.parent.appendChild(d);
        return d;
    }

    static moveBoxesDown() {
        for (var i = Box.boxes.length - 1; i >= 0; i--)
            Box.boxes[i].moveBoxDown();
    }

    moveBoxDown() {
        Box.locker = true;
        this.y++;
        var count = 100;
        var ins = this;
        var interval = setInterval(function () {
            if (count <= 0)
                clearInterval(interval);
            ins.div.style.top = ins.y * 100 - count + 1 + 'px';
            count -= 5;
        }, 1000 / 60);
    }

    static collisions(ball) {
        var c = 0;
        for (var i = 0; i < Box.boxes.length; i++) {
            var box = Box.boxes[i - c];
            var x = box.x * 100 + 1;
            var y = box.y * 100 + 1;
            var vx = ball.x + Ball.r - (x + 48);
            var vy = ball.y + Ball.r - (y + 48);
            switch (box.type) {
                case 0:
                    if (ball.x < x + 96 &&
                        ball.x + 2 * Ball.r > x &&
                        ball.y < y + 96 &&
                        ball.y + 2 * Ball.r > y) {
                        if (vx > vy) //верхняя правая
                            if (Math.abs(vx) < Math.abs(vy)) //верхняя
                                ball.sy = -1 * Math.abs(ball.sy);
                            else //правая
                                ball.sx = Math.abs(ball.sx);
                        else {  //нижняя левая
                            if (Math.abs(vx) > Math.abs(vy)) //левая
                                ball.sx = -1 * Math.abs(ball.sx);
                            else //нижняя
                                ball.sy = Math.abs(ball.sy);
                        }
                        box.life--;
                        box.div.innerHTML = box.life;
                        if (box.life <= 0) {
                            Box.boxes.splice(i - c, 1);
                            Box.parent.removeChild(box.div);
                            c++;
                        }
                    }
                    break;
                case 1:
                    if (ball.x < x + 96 &&
                        ball.y + 2 * Ball.r > y &&
                        ball.y < ball.x + 2 * Ball.r - x + y) {
                        if (vx > vy) //верхняя правая
                            if (Math.abs(vx) < Math.abs(vy)) //верхняя
                                ball.sy = -1 * Math.abs(ball.sy);
                            else //правая
                                ball.sx = Math.abs(ball.sx);
                        else {  //нижняя левая
                            var tmp = ball.sx;
                            ball.sx = ball.sy;
                            ball.sy = tmp;
                        }
                        box.life--;
                        box.div.innerHTML = box.life;
                        if (box.life <= 0) {
                            Box.boxes.splice(i - c, 1);
                            Box.parent.removeChild(box.div);
                            c++;
                        }
                    }
                    break;
                case 2:
                    if (ball.x < x + 96 &&
                        ball.y < y + 96 &&
                        ball.y + 2 * Ball.r > -1 * (ball.x + 2 * Ball.r) + x + y + 96) {
                        if (vx > vy) //верхняя правая
                            if (Math.abs(vx) < Math.abs(vy)) { //верхняя
                                var tmp = ball.sx;
                                ball.sx = -1 * ball.sy;
                                ball.sy = -1 * tmp;
                            }
                            else //правая
                                ball.sx = Math.abs(ball.sx);
                        else {  //нижняя левая
                            if (Math.abs(vx) > Math.abs(vy)) { //левая
                                var tmp = ball.sx;
                                ball.sx = -1 * ball.sy;
                                ball.sy = -1 * tmp;
                            }
                            else //нижняя
                                ball.sy = Math.abs(ball.sy);
                        }
                        box.life--;
                        box.div.innerHTML = box.life;
                        if (box.life <= 0) {
                            Box.boxes.splice(i - c, 1);
                            Box.parent.removeChild(box.div);
                            c++;
                        }
                    }
                    break;
                case 3:
                    if (ball.x + 2 * Ball.r > x &&
                        ball.y < y + 96 &&
                        ball.y + 2 * Ball.r > ball.x - x + y) {
                        if (vx > vy) { //верхняя правая
                            var tmp = ball.sx;
                            ball.sx = ball.sy;
                            ball.sy = tmp;
                        }
                        else {  //нижняя левая
                            if (Math.abs(vx) > Math.abs(vy)) //левая
                                ball.sx = -1 * Math.abs(ball.sx);
                            else //нижняя
                                ball.sy = Math.abs(ball.sy);
                        }
                        box.life--;
                        box.div.innerHTML = box.life;
                        if (box.life <= 0) {
                            Box.boxes.splice(i - c, 1);
                            Box.parent.removeChild(box.div);
                            c++;
                        }
                    }
                    break;
                case 4:
                    if (ball.x + 2 * Ball.r > x &&
                        ball.y + 2 * Ball.r > y &&
                        ball.y < -1 * ball.x + x + y + 96) {
                        if (vx > vy) //верхняя правая
                            if (Math.abs(vx) < Math.abs(vy)) //верхняя
                                ball.sy = -1 * Math.abs(ball.sy);
                            else { //правая
                                var tmp = ball.sx;
                                ball.sx = -1 * ball.sy;
                                ball.sy = -1 * tmp;
                            }
                        else {  //нижняя левая
                            if (Math.abs(vx) > Math.abs(vy)) //левая
                                ball.sx = -1 * Math.abs(ball.sx);
                            else { //нижняя
                                var tmp = ball.sx;
                                ball.sx = -1 * ball.sy;
                                ball.sy = -1 * tmp;
                            }
                        }
                        box.life--;
                        box.div.innerHTML = box.life;
                        if (box.life <= 0) {
                            Box.boxes.splice(i - c, 1);
                            Box.parent.removeChild(box.div);
                            c++;
                        }
                    }
                    break;
            }
        }
    }
}

Box.count = 1;
Box.parent = null;
Box.boxes = [];