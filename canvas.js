var width = window.innerWidth * 0.7;
var height = window.innerHeight * 0.7;

var can = document.getElementById("firstCanvas");
var ctx = can.getContext("2d");

var side = Math.min(height, width);

can.width = side;
can.height = side;

can.style.border = "1px solid black";

var step = 5;

function drawGrid(pos) {
    ctx.beginPath();
    for(var i=0; i<side/step; i++) {
        for(var j=0; j<side/step; j++) {
            var r = Math.sqrt((i-side/(2*step))**2 + (j-side/(2*step))**2);
            ctx.fillStyle = `rgb(${128+75*Math.sin((r-j-pos)/5)}, 
                ${128+75*Math.sin((r+i+pos)/5)},
                ${128+75*Math.sin((-r-j-pos)/5)})`;
            ctx.fillRect(i*step, j*step, (i+1)*step, (j+1)*step);
        }
    }
}

function changeColor() {
    setInterval(frame, 20);
    var p = 0;
    function frame() {
        p++;
        p = p % 100000;
        drawGrid(p);
    }
}