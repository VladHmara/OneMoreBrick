function drawSquare(parent,num) {
    var d = document.createElement('div');

    d.style.position = 'absolute';
    d.style.width = '96px';
    d.style.height = '96px';

    d.style.background = 'black';

    d.style.top = '2px';
    d.style.left = num*100 + 1 +'px';

    d.innerHTML = '123';
    d.style.color = 'white';
    d.style.fontSize = '30px';
    d.style.display = 'flex';
    d.style.alignItems = "center";
    d.style.justifyContent ='center';

    parent.appendChild(d);

    return d;
}

function drawTriangle(parent,num, dir) {
    var d = document.createElement('div');

    d.style.position = 'absolute';
    d.style.width = '96px';
    d.style.height = '96px';

    d.style.border = 'solid 48px transparent';

    switch(dir) {
        case 0:
            d.style.borderTop = 'solid 48px black';
            d.style.borderRight = 'solid 48px black';
            d.style.alignItems = "flex-end";
            break;
        case 1:
            d.style.borderRight = 'solid 48px black';
            d.style.borderBottom = 'solid 48px black';
            break;
        case 2:
            d.style.borderBottom = 'solid 48px black';
            d.style.borderLeft = 'solid 48px black';
            d.style.justifyContent = "flex-end";
            break;
        case 3:
            d.style.borderLeft = 'solid 48px black';
            d.style.borderTop = 'solid 48px black';
            d.style.justifyContent = "flex-end";
            d.style.alignItems = "flex-end";
            break;
    }

    d.style.top = '2px';
    d.style.left = num*100 + 1 +'px';

    d.style.display = 'flex';
    d.innerHTML = '123';
    d.style.color = 'white';
    d.style.fontSize = '30px';

    parent.appendChild(d);

    return d;
}