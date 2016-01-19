window.onload = init;
var ctx;
var begin = 1200
var snelheid = 10; //hoe snel de blokken op je af komen
var up = false;
var right = false;
var left = false;
var xpositie = 10; //begin positie horizontaal 
var ypositie = 753; //begin positie verticaal 
var sidewayspeed = 3; //snelheid links,rechts
var jumpspeed = 18; //snelheid sprong omhoog
var landspeed = 10; //snelheid landing


function init() {
	document.onkeydown = handleKeyDown;
	document.onkeyup = handleKeyUp;
	console.log("Init")
	var canvas = document.querySelector("canvas");
	ctx = canvas.getContext("2d");
	animate();
}

function drawScreen() {
	ctx.clearRect(0,0,1200,800);
	drawObjects()
	moveShit();

}

function moveShit(){
	begin -= snelheid;
}

function drawObjects() {
	
	ctx.fillStyle = "red";
	ctx.fillRect(begin,300,500,50);
	ctx.fillRect(0,775,1200,25);
}

function animate() {
	drawScreen();
	requestAnimationFrame(animate);
	drawPlayer();
	position();
}



function drawPlayer() {
	ctx.save
	ctx.fillStyle = "white";
	ctx.fillRect(xpositie, ypositie, 15, 35)
	ctx.restore
}

function handleKeyDown(evt) {
	evt = evt || window.event;
	switch (evt.keyCode) {
		case 37:
		left = true;
		break;
		case 38:
		up = true;
		break;
		case 39:
		right = true;
		break;
	}
}

function handleKeyUp(evt) {
		evt = evt || window.event;
		switch (evt.keyCode) {
			case 37:
			left = false;
			break;
			case 38:
			up = false;
			break;
			case 39:
			right = false;
			break;

		}
}



function position(){

	if (left) {
		xpositie -= sidewayspeed
	} else if (right) {
		xpositie += sidewayspeed
	}
	

	if (up){
		ypositie -= jumpspeed;
	}else {
		ypositie += landspeed;
	}
	if (ypositie >= 740){ // vloer (min positie)
		ypositie = 740;
	}
}
