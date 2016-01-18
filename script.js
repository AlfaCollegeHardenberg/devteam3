window.onload = init;
var ctx;
var begin = 1200
var snelheid = 10;


function init() {
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
	ctx.fillstyle = "red";
	ctx.fillRect(begin,750,1200,50);
}

function animate() {
	drawScreen();
	drawObjects();
	requestAnimationFrame(animate);
}