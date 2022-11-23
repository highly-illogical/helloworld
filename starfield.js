var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');

var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;

var centerx = width/2, centery = height/2;

function Point(r, theta) {
    this.r = r;
    this.theta = theta;
}

Point.prototype.draw = function() {
    ctx.beginPath();
    var x = centerx + this.r*Math.cos(this.theta);
    var y = centery + this.r*Math.sin(this.theta);
    ctx.fillStyle = 'rgb(255, 255, 255)';
    ctx.moveTo(x, y);
    ctx.arc(x, y, 1, 0, 2*Math.PI, true);
    ctx.fill();
}

Point.prototype.update = function() {
    this.r += Math.pow(this.r/3+2, 1.25)/100;
    if ((Math.abs(this.r*Math.sin(this.theta)) > height/2) ||
        (Math.abs(this.r*Math.cos(this.theta)) > width/2)) {
	    var x = Math.random()*width-centerx;
	    var y = Math.random()*height-centery;
            this.r = x**2+y**2;
            this.theta = 2*Math.atan(y/x);
        }
}

var points = new Array(1000);

for(var i=0; i<1000; i++) {
    points[i] = new Point(Math.random()*250, Math.random()*2*Math.PI);
}

function loop() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.25)';
    ctx.fillRect(0, 0, width, height);
    for(var i=0; i<1000; i++) {
        points[i].draw();
        points[i].update();
    }
    requestAnimationFrame(loop);
}

loop();