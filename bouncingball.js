function move() {

	var score = 0;
	
	// controlling position of bat
	var posbat = 100;
	window.addEventListener("keypress", function(event){
		if (event.keyCode == 100) {
			if (posbat <= 275) { posbat = posbat + 10; }
		}
		else if (event.keyCode == 97) {
			if (posbat >= 10) { posbat = posbat - 10; }
		}
		document.getElementById("two").style.left = posbat + "px";
	});

	// movement of ball
	var v = parseFloat(document.getElementById("velocity").value);
	var vx = v;
	var vy = 3.5*v;
	var an = setInterval(frame, 10);
	var posx = 0, posy = 0;
	function frame() {
		if (posy >= 400) {
			clearInterval(an);
		}
		else {
			posx = posx + vx;
			posy = posy + vy;
			if ((posy >= 340) && (posx >= posbat-10) && (posx <= posbat+90)) {
				 vy = -1*vy;
				 score = score + 1;
				 document.getElementById("score").innerText = `Score: ${score}`
				}
			if (posy <= 0) {
				vy = -1*vy;
			}
			if ((posx >= 360) || (posx <= 0)) { vx = -1*vx; }
			document.getElementById("one").style.top = posy + "px";
			document.getElementById("one").style.left = posx + "px";
		}
	}
}