var cells = new Array(52);
var cells_next = new Array(52);

var h = window.innerHeight * 0.95;
var w = window.innerWidth * 0.95;

var side;

if (w > h) {
	side = 500;
} else {
	side = w;
}

var can = document.getElementById('firstCanvas');
var ctx = can.getContext('2d');

can.width = side;
can.height = side;

can.style.border = `${side / 50}px solid black`;
can.style.backgroundColor = 'white';

var step = side / 50;

function reset() {
	for (var i = 0; i < 52; i++) {
		cells[i] = new Array(52).fill(0);
		cells_next[i] = new Array(52).fill(0);
	}

	for (var i = 1; i < 51; i++) {
		for (var j = 1; j < 51; j++) {
			cells[i][j] = Math.floor(Math.random() * 2);
		}
	}
}

function conway() {
	ctx.beginPath();
	for (var i = 1; i < 51; i++) {
		for (var j = 1; j < 51; j++) {
			if (cells[i][j] == 1) {
				ctx.fillStyle = 'rgb(0, 0, 0)';
			} else {
				ctx.fillStyle = 'rgb(255, 255, 255)';
			}
			ctx.fillRect((j - 1) * step, (i - 1) * step, step, step);
		}
	}
	iterate();
}

function iterate() {
	for (var i = 1; i < 51; i++) {
		for (var j = 1; j < 51; j++) {
			neighbors =
				cells[i - 1][j - 1] +
				cells[i - 1][j] +
				cells[i - 1][j + 1] +
				cells[i][j - 1] +
				cells[i][j + 1] +
				cells[i + 1][j - 1] +
				cells[i + 1][j] +
				cells[i + 1][j + 1];
			cells_next[i][j] = 0;
			if (cells[i][j] == 1) {
				if (neighbors == 2 || neighbors == 3) {
					cells_next[i][j] = 1;
				}
			}
			if (cells[i][j] == 0) {
				if (neighbors == 3) {
					cells_next[i][j] = 1;
				}
			}
		}
	}
	for (var i = 1; i < 51; i++) {
		for (var j = 1; j < 51; j++) {
			cells[i][j] = cells_next[i][j];
		}
	}
}

reset();
