window.onload = init;
var ctx;
var x = 400;
var y = 320;




function init() {
	var canvas = document.querySelector("canvas");
	ctx = canvas.getContext("2d");
	drawSpaceShip();
	animate();
}

function animate() {
	drawScene();
	requestAnimationFrame(animate);
}

