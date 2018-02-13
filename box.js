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
                    new Box(i, Math.round(0), 1);
                else
                    new Box(i, Math.round(Math.random() * 3 + 1), 1);
        }
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
        var interval = setInterval(function () {
            if (!Box.locker) {
                Box.count++;
                Box.drawBoxes();
                clearInterval(interval);
            }
        }, 100);
    }

    moveBoxDown() {
        Box.locker = true;
        this.y++;
        var count = 100;
        var ins = this;
        var interval = setInterval(function () {
            if (count == 0) {
                Box.locker = false;
                clearInterval(interval);
            }
            ins.div.style.top = ins.y * 100 - count + 1 + 'px';
            count--;
        }, 0);
    }

}

Box.locker = false;
Box.count = 1;
Box.parent = null;
Box.boxes = [];