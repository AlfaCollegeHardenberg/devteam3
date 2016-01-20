window.onload = init;
var ctx;
var begin = 1200
var snelheid = 4; //hoe snel de blokken op je af komen
var up = false;
var right = false;
var left = false;
var jump = false;
var xpositie = 10; //begin positie horizontaal 
var ypositie = 753; //begin positie verticaal 
var sidewayspeed = 3; //snelheid links,rechts
var jumpspeed = 18; //snelheid sprong omhoog
var landspeed = 10; //snelheid landing
var floor = 690; // hoogte van vloer
var objectHeight = 590; //hoogte van blok
var objectWidth = 500; // breedte van blok
var eersteVloer = 0;
var tweedeVloer = 1200;
var poppetje = new Image(); 
poppetje.src="run002.png";
var vloer = new Image();
vloer.src="grond.png";


var i = 0;
var nieuwPoppetje = new Image();
var poppetje = ["run002.png","run003.png","run004.png","run006.png","run007.png"];

function animatePoppetje(){


    i+= 1;

    if (i == 12) {
        nieuwPoppetje.src = poppetje[0];
    } else if (i == 24) {
        nieuwPoppetje.src = poppetje[1];
    } else if (i == 36) {
        nieuwPoppetje.src = poppetje[2];
    } else if (i == 48) {
        nieuwPoppetje.src = poppetje[3];
    } else if (i == 60) {
        nieuwPoppetje.src = poppetje[4];
    } else if (i > 60){
        i = 0;
    }

}


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
	eersteVloer -= snelheid;
	tweedeVloer -= snelheid;
}

function drawObjects() {
	ctx.fillStyle = "red";
	ctx.fillRect(begin,objectHeight,objectWidth,50); //vliegend object1                                                 
	ctx.drawImage(vloer,eersteVloer,775); //grond
	ctx.drawImage(vloer,tweedeVloer,775);
	if (begin <= -500) {
		begin = 1200;
		objectHeight = 640 - (Math.floor(Math.random() * 100) + 1) 
	}

	if (eersteVloer == -1200){
		eersteVloer = 0
	}

	if (tweedeVloer == 0){
		tweedeVloer = 1200;
	}

}

function animate() {
	drawScreen();
	requestAnimationFrame(animate);
	drawPlayer();
	animatePoppetje();
	position();
}


function drawPlayer() {	
	ctx.save
	ctx.drawImage(nieuwPoppetje,xpositie,ypositie);
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


grounded = true;
function position(){
console.log(floor)

	if (left) {
		xpositie -= sidewayspeed
	} else if (right) {
		xpositie += sidewayspeed
	}
	
	if (ypositie <= (floor - 290)) {
		grounded = false;
	}
	
	if (up && grounded == true){
		ypositie -= jumpspeed;
	}else{
		grounded = false;
		ypositie += landspeed;
	}
	if (ypositie >= 690){ // vloer (min positie)
		ypositie = 690;
		floor = 690
		grounded = true;
	}
	if (xpositie >= begin - 60 && xpositie <= begin + (objectWidth - 50) && ypositie > (objectHeight - 85) && ypositie < 650){
		ypositie = objectHeight - 85;
		grounded = true;
		floor = objectHeight -85;
		
	}

}
