window.onload = init;
var ctx;
var begin = 1200
var snelheid = 10;
var up = false;
var right = false;
var left = false;


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
	drawObjects();
	moveShit();

}

function moveShit(){
	begin -= snelheid;
}

function drawObjects() {
	ctx.fillStyle = "red";
	ctx.fillRect(begin,300,500,50);
	ctx.fillRect(begin,750,1200,50);
}

function animate() {
	drawScreen();
	drawObjects();
	requestAnimationFrame(animate);
	drawPlayer();
	movePlayer();
	//position();
}


var gravity = 0;
var horizontal = 0
var xPos = 0;
var yPos = 0;

function drawPlayer() {
	ctx.translate(xPos, yPos)
	ctx.fillStyle = "white";
	ctx.fillRect(1000, 200, 15, 35)
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


function movePlayer() {
	if (left && horizontal != -0.2) {
		horizontal -= 0.1
	} else if (right && horizontal != 0.2) {
		horizontal += 0.1;
	}
	if (left != true && right != true) {
		horizontal = 0
	}
	if (up) {
		gravity -= 0.3
	}
	yPos += gravity
	xPos += horizontal
}

//function position() {
//	if (horizontal) == 0.5
//		horizontal = 0.5
//	if (yPos = 0) {
//		gravity = 0
//	}
//}

