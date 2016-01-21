window.onload = init;
var ctx;
var begin = 1200;
var beginBlokTwee = 1700;
var snelheid = 10; //hoe snel de blokken op je af komen
var up = false;
var right = false;
var left = false;
var jump = false;
var xpositie = 10; //begin positie horizontaal 
var ypositie = 753; //begin positie verticaal 
var sidewayspeed = 4; //snelheid links,rechts
var jumpspeed = 18; //snelheid sprong omhoog
var landspeed = 10; //snelheid landing
var floor = 690; // hoogte van vloer
var objectHeight = 590; //hoogte van blok 1
var heightBlokTwee = 400; // hoogte blok 2
var eersteVloer = 0;
var tweedeVloer = 1200;
var poppetje = new Image(); 
poppetje.src="run002.png";
var vloer = new Image();
vloer.src="grond.png";
var clock = new Image();
clock.src = "clock.png";
var blok1 = new Image();
blok1.src = "blok1.png";
var getal = 1

function init() {
	document.onkeydown = handleKeyDown;
	document.onkeyup = handleKeyUp;
	console.log("Init")
	var canvas = document.querySelector("canvas");
	ctx = canvas.getContext("2d");
	animate();
}

function randomBlok(){
    var randomGetal = Math.floor((Math.random() * 3) + 1);
    if (randomGetal == 1) {
        blok1.src = "blok1.png";
        getal = 1// breedte 483px
    }else if (randomGetal == 2) {
        blok1.src = "blok2.png";
        getal = 2// breedte 345px
    }else if (randomGetal == 3) {
        blok1.src = "blok3.png";
        getal = 3 // breedte 276px
    }
}


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


function drawScreen() {
	ctx.clearRect(0,0,1200,800);
	drawObjects()
	moveShit();
	ctx.fillStyle="red";
	ctx.font = "30px Arial";
	ctx.fillText(timer, 30, 100, 50)
}

function moveShit(){
	begin -= snelheid;
	beginBlokTwee -= snelheid;
	eersteVloer -= snelheid;
	tweedeVloer -= snelheid;
	clockposX -= snelheid;
}

var randKlok = 0;
var clockPositie = [floor, objectHeight, heightBlokTwee];
var clockposX = 200;
var clockposY = 500;
function drawObjects() {
	ctx.drawImage(clock,clockposX,clockposY,50,50); //klokje wordt gemaakt
	ctx.drawImage(blok1, begin, objectHeight); // object 1 opgemaakt
	ctx.fillStyle="green";
	ctx.fillRect(beginBlokTwee,heightBlokTwee,500,50);                                           
	ctx.drawImage(vloer,eersteVloer,775); //grond
	ctx.drawImage(vloer,tweedeVloer,775);
	if (beginBlokTwee <= -500) {
		beginBlokTwee = 1200; // blok achteraan zetten
		heightBlokTwee = 400 - (Math.floor(Math.random() * 120))
	}

	if (begin <= -500) {
		begin = 1200; // als blok1 geweest is, achteraan zetten
		objectHeight = 640 - (Math.floor(Math.random() * 100) + 1)
		randomBlok();
	}

	if (eersteVloer == -1200){ //zorgt voor rollende vloer
		eersteVloer = 0
	}
	if (tweedeVloer == 0){
		tweedeVloer = 1200;
	}

	if (clockposX == -1200){
		clockposX = 1200; //random klok
		randKlok = (Math.floor(Math.random() * 3) + 1) - 1;
		clockposY = clockPositie[randKlok] -100;
		if (clockposY <= objectHeight && clockposY >= objectHeight -50){
			clockposY -= 110;
		}
		if (clockposY <= heightBlokTwee && clockposY >= heightBlokTwee -50){
			clockposY -= 110;
		}
		hit == true;
	}
	return clockposY
}

var timer = 60
var timerteller = 0
function animate() { //60fps functie
	drawScreen();
	requestAnimationFrame(animate);
	drawPlayer();
	animatePoppetje();
	position();
	timerteller += 1
	if (timerteller == 60){
		timerteller = 0
		timer -= 1
	}

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

hit = true;
grounded = true;
function position(){
	console.log(clockposY)
	if (ypositie <= clockposY + 20 && ypositie >= clockposY - 70 && xpositie <= clockposX + 10 && xpositie >= clockposX - 70 && hit == true){
		timer += 10;
		hit = false;
		console.log("hit")
	}

	if (left) { 		// Left arrow key = naar links bewegen
		xpositie -= sidewayspeed
	} else if (right) { // right arrow key = naar rechts bewegen
		xpositie += sidewayspeed
	} else {
		xpositie -= 2
	}
	
	if (ypositie <= (floor - 290)) {		//zorgt er voor dat je naar beneden komt na sprong
		grounded = false;
	}
	
	if (up && grounded == true){	// key up = jump
		ypositie -= jumpspeed;
	}else{
		grounded = false;
		ypositie += landspeed;
	}
	if (ypositie >= 690){ // vloer (min positie)		// zorgt er voor dat je niet door de grond valt
		ypositie = 690;
		floor = 690
		grounded = true;
		hit = true;
	}
		
	if (getal == 1){ // wanneer blok #1 gebruikt wordt
		if (ypositie <= objectHeight && ypositie >= objectHeight - 50 && xpositie >= begin - 60 && xpositie <= begin + 441){
			ypositie = objectHeight + 1 //zorgt voor dichte onderkant
			grounded = false; 
		}
		if (xpositie >= begin - 60 && xpositie <= begin + (440) && ypositie > (objectHeight - 85) && ypositie <= objectHeight){
			ypositie = objectHeight - 85;
			grounded = true;
			hit = true; //zorgt er voor dat je er op kan staan (verandert waarde floor)
			floor = objectHeight -85;
		}

	} else if (getal == 2){ //wanneer blok #2 gebruikt wordt
		if (ypositie <= objectHeight && ypositie >= objectHeight - 50 && xpositie >= begin - 60 && xpositie <= begin + 301){
			ypositie = objectHeight + 1 //dichte onderkant
			grounded = false;
		}

		if (xpositie >= begin - 60 && xpositie <= begin + (300) && ypositie > (objectHeight - 85) && ypositie <= objectHeight){
			ypositie = objectHeight - 85;
			grounded = true;
			hit = true; // zorgt voor bovenkant
			floor = objectHeight -85;
		}
	}
	else if (getal == 3){
		if (ypositie <= objectHeight && ypositie >= objectHeight - 50 && xpositie >= begin - 60 && xpositie <= begin + 231){
			ypositie = objectHeight + 1; // dichte onderkant
			grounded = false;
		}

		if (xpositie >= begin - 60 && xpositie <= begin + (230) && ypositie > (objectHeight - 85) && ypositie <= objectHeight){
			ypositie = objectHeight - 85;
			grounded = true;
			hit = true; // zorgt voor bovenkant
			floor = objectHeight -85;
		}
	}
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////// BLOK2
	if (ypositie <= heightBlokTwee && ypositie >= heightBlokTwee - 50 && xpositie >= beginBlokTwee - 60 && xpositie <= beginBlokTwee + 441){
		ypositie = heightBlokTwee + 1 //zorgt voor dichte onderkant
		grounded = false; 
	}
	if (xpositie >= beginBlokTwee - 60 && xpositie <= beginBlokTwee + (440) && ypositie > (heightBlokTwee - 85) && ypositie <= heightBlokTwee){
		ypositie = heightBlokTwee - 85;
		grounded = true;
		hit = true; //zorgt er voor dat je er op kan staan (verandert waarde floor)
		floor = heightBlokTwee -85;
	}
	
	if (xpositie >= 1111) { // dichte zijkanten
		xpositie = 1111;
	}else if (xpositie <= -20)
		xpositie = -20;
	}

	//klok geeft extra tij