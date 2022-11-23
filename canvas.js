function drawGrid(pos) {
    var can = document.getElementById("firstCanvas");
    var ctx = can.getContext("2d");
    ctx.beginPath();
    for(var i=0; i<80; i++) {
        for(var j=0; j<80; j++) {
            var r = Math.sqrt((i-40)**2 + (j-40)**2);
            ctx.fillStyle = `rgb(${128+75*Math.sin((r-j-pos)/5)}, 
                ${128+75*Math.sin((r+i+pos)/5)},
                ${128+75*Math.sin((-r-j-pos)/5)})`;
            ctx.fillRect(i*5, j*5, (i+1)*5, (j+1)*5);
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