window.onload = init;
var ctx;
var begin = 1200;
var beginBlokTwee = 1700;
var snelheid = 10; //hoe snel de blokken op je af komen
var up = false;
var right = false;
var left = false;
var jump = false;
var space = false;
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
var vloer2 = new Image();
vloer2.src = "grond.png"
var clock = new Image();
clock.src = "clock.png";
var blok1 = new Image();
blok1.src = "blok1.png";
var hogeblok = new Image();
hogeblok.src = "blok1.png";
var getal = 1;
var eersteAchtergrond = 0;
var tweedeAchtergrond = 1200;
var hoi = new Image();
hoi.src = "achtergrondje.png";
var hoi2 = new Image();
hoi2.src = "achtergrondje.png";
var audio = new Audio('mariocoin.WAV');
var muziek = new Audio('nevergonnagiveyouup.mp3')
var bord = new Image();
bord.src = "bord.png";
var cactusEen = new Image();
cactusEen.src = "cactus1.png";
var cactusTwee = new Image();
cactusTwee.src = "cactus2.png";
var cactusDrie = new Image();
cactusDrie.src = "cactus3.png";
var randomCactusEen = 600;
var randomCactusTwee = 900;
var randomCactusDrie = 300;
var textje = "Klik om te beginnen";
var nul = 150;
var nul1 = 400;
var playerdown = new Audio();
playerdown.src = "playerdown.mp3"



function init() {
	document.onkeydown = handleKeyDown;
	document.onkeyup = handleKeyUp;
	console.log("Init")
	var canvas = document.querySelector("canvas");
	ctx = canvas.getContext("2d");
	startscreen();
}

var animateSpel = 0
function startscreen() {
    ctx.drawImage(hoi,0,0);
    ctx.fillStyle="black";
	ctx.font = "100px Arial";
    ctx.fillText(textje, nul, nul);
	
	$('canvas').on('click', function(){
        animateSpel += 1;
        var count = 5;
        var timerId = setInterval(function() {
            count--;
        console.log(count);
        if (animateSpel == 1)
        if (count == 4) {
            ctx.fillStyle="black";
	        ctx.font = "100px Arial";
            ctx.fillText(3, 400, 400 + 1); 
        }
              if (count == 3) {
            ctx.fillStyle="black";
	        ctx.font = "100px Arial";
            ctx.fillText(2, 480, 400 + 1); 
        }
              if (count == 2) {
            ctx.fillStyle="black";
	        ctx.font = "100px Arial";
            ctx.fillText(1, 560, 400); 
        }
              if (count == 1 ) {
            ctx.fillStyle="black";
	        ctx.font = "100px Arial";
            ctx.fillText("Start!", 390, 500); 
              }
            
        if(count == 0) {
            animate();
            muziek.play();
        }
    }, 1000);
	});
}

function randomBlokSneeuw(){
    var randomGetal = Math.floor((Math.random() * 3) + 1);
    if (randomGetal == 1) {
        blok1.src = "sneeuwblok1.png";
        getal = 1// breedte 483px
    }else if (randomGetal == 2) {
        blok1.src = "sneeuwblok2.png";
        getal = 2// breedte 345px
    }else if (randomGetal == 3) {
        blok1.src = "sneeuwblok3.png";
        getal = 3 // breedte 276px
    }
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

var score = 0;
function drawScreen() {
	ctx.clearRect(0,0,1200,800);
	drawObjects()
	moveShit();
    ctx.drawImage(bord,28,60);
    ctx.drawImage(bord,1098,60);
	ctx.fillStyle="white";
	ctx.font = "30px Arial";
	ctx.fillText(("Time: " + timer), 30, 100, 80)
	ctx.fillText(("Score: " + score), 1100, 100, 80)

}

function moveShit(){
	begin -= snelheid;
	beginBlokTwee -= snelheid;
	eersteVloer -= snelheid;
	tweedeVloer -= snelheid;
	clockposX -= snelheid;
    eersteAchtergrond -= snelheid;
    tweedeAchtergrond -= snelheid;
}

var randKlok = 0;
var clockPositie = [floor, objectHeight, heightBlokTwee];
var clockposX = 200;
var clockposY = 500;
function drawObjects() {

    ctx.drawImage(hoi,eersteAchtergrond,0);
    ctx.drawImage(hoi2,tweedeAchtergrond,0);
	ctx.drawImage(clock,clockposX,clockposY,50,50); //klokje wordt gemaakt
    ctx.drawImage(cactusEen,clockposX + 1100,670);
    ctx.drawImage(cactusTwee,clockposX + 300,700)
    
	ctx.drawImage(blok1, begin, objectHeight); // object 1 opgemaakt
    ctx.drawImage(hogeblok,beginBlokTwee,heightBlokTwee);
    
	ctx.drawImage(vloer,eersteVloer,775); //grond
	ctx.drawImage(vloer2,tweedeVloer,775);
	if (beginBlokTwee <= -500) {
		beginBlokTwee = 1200; // blok achteraan zetten
		heightBlokTwee = 400 - (Math.floor(Math.random() * 120))
	}

	if (begin <= -500) {
		begin = 1200; // als blok1 geweest is, achteraan zetten
		objectHeight = 640 - (Math.floor(Math.random() * 100) + 1)
		if (score >= 110) {
            randomBlokSneeuw();
        } else if (score <= 100) {
            randomBlok();
        }
	}

	if (eersteVloer == -1200 && score <= 110){ //zorgt voor rollende vloer
		eersteVloer = 0;
        vloer.src = "grond.png";
	} else if (eersteVloer == - 1200 && score >= 110 ) {
        eersteVloer = 0;
        vloer.src = "sneeuwgrond.png";
        
    }
    if (score >= 100) {
        hogeblok.src = "sneeuwblok1.png";
    }
	if (tweedeVloer == 0 && score <= 100){ //zorgt voor rollende vloer
		tweedeVloer = 1200;
        vloer2.src = "grond.png";
	} else if (tweedeVloer ==  0 && score >=100) {
        tweedeVloer = 1200;
        vloer2.src = "sneeuwgrond.png";
    }
    if (eersteAchtergrond == -1200 && score <= 100) {
        eersteAchtergrond = 1200;
        hoi.src="achtergrondje.png";
    } else if (eersteAchtergrond == -1200 && score >= 100) {
        eersteAchtergrond = 1200;
        hoi.src="bgsneeuw.png";
    }

    if (tweedeAchtergrond == -1200 && score <= 100) {
        tweedeAchtergrond = 1200;
        hoi2.src="achtergrondje.png";
    } else if (tweedeAchtergrond == -1200 && score >= 100) {
        tweedeAchtergrond = 1200;
        hoi2.src="bgsneeuw.png";
    }


	if (clockposX == -1200){
		clockposX = 1200; //random klok
		randKlok = (Math.floor(Math.random() * 3) + 1) - 1;
		clockposY = clockPositie[randKlok] -100;
		hit == true;
	}


	return clockposY
}
function doodPoppetje(){
    nieuwPoppetje.src = "rundood.png";
}

var timer = 10
var timerteller = 0
var scoreteller = 0
function animate() { //60fps functie
	drawScreen();
	requestAnimationFrame(animate);
	drawPlayer();
	animatePoppetje();
	position();
	timerteller += 1;
	if (timerteller == 60){
		timerteller = 0;
		timer -= 1;
	}
	if (timer <= 0){
		hit = false;
        
		timer = 0;
        
//        alert("DOOD!");
        doodPoppetje();
        snelheid = 0;
        playerdown.play();
        muziek.pause();
        ctx.fillStyle="black";
	   ctx.font = "100px Arial";
	   ctx.fillText(("Dood! je score is " + score), 75, 400);
        	setTimeout(function(){location.href = location.href}, 4400);

	}
	scoreteller += 1;
	if (scoreteller == 10 && timer > 0){
		scoreteller = 0;
		score += 1;
	}
    if (score >= 115) {
        cactusEen.src = "SnowMan.png";
        cactusTwee.src = "Crystal.png";
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
		space = true;
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

	if (clockposY >= objectHeight - 50 && clockposY <= objectHeight && clockposX >= begin - 60 && clockposX <= begin + 441){
		clockposY -= 80;
	}
	if (clockposY >= heightBlokTwee - 50 && clockposY <= heightBlokTwee && clockposX >= beginBlokTwee -60 && clockposX <= beginBlokTwee + 440){
	
		clockposY -= 80;
	}

	if (ypositie <= clockposY + 20 && ypositie >= clockposY - 70 && xpositie <= clockposX + 10 && xpositie >= clockposX - 70 && hit == true){
		timer += 5;
		hit = false; //klok
		clockposY = 800;
        audio.play();
	}

	if (left) { 		// Left arrow key = naar links bewegen
        animatePoppetje();
		xpositie -= sidewayspeed
	} else if (right) { // right arrow key = naar rechts bewegen
		xpositie += sidewayspeed
        animatePoppetje();
	}  else if (timer > 0) {
		xpositie -= 2
        animatePoppetje();
	}
	
	if (ypositie <= (floor - 290)) {		//zorgt er voor dat je naar beneden komt na sprong
		grounded = false;
	}
	
	if (up && grounded == true){	// key up = jump
		ypositie -= jumpspeed;
        nieuwPoppetje.src = "run001.png";
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