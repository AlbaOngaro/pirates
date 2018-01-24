var canvas, canvasContext;
var frameIndex = 0;
var tickCount = 0;
var ticksPerFrame = 1;
var hit = false;
var lastShotX;
var lastShotY;
var winner;
var enemies = [];

var p1 = new shipClass();
var enemy1 = new shipClass(); 
var enemy2 = new shipClass();
var enemy3 = new shipClass();

enemies.push(enemy1,enemy2,enemy3);

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
    loadScreenText();
    loadImages();
    sliderReset();
}

function startGame() {
	var framesPerSecond = 30;
	setInterval(updateAll, 1000/framesPerSecond);
    SetupInput();
    loadLevel(levelOne);
}

function loadLevel(whichLevel){
    worldGrid = whichLevel.slice();
	p1.reset(redShipPic,"Ruby",true);
    enemy1.reset(greenShipPic,"Emerald",false);
    enemy2.reset(blueShipPic,"Sapphire",false);
    enemy3.reset(yellowShipPic, "Diamond", false);
    p1.myShot.reset('left', enemies);
    enemy1.myShot.reset('front',p1);
    enemy2.myShot.reset('front',p1);
    enemy3.myShot.reset('front',p1);
}

function updateAll() {
    if (winner == undefined) {
        moveAll();
        drawAll();
    } else {
        drawAll();
        winnerScreen();
    }
}

function moveAll() {
	p1.move();
    /// p1 is the target element, which makes the enemy1 move against it
    for (var i=0; i<enemies.length;i++) {
       enemies[i].move(p1); 
    }
    sliderMove();
    cameraFollow();
}

function clearScreen() {
    colorRect(0,0, canvas.width,canvas.height, 'black');
}

function drawAll() {
    canvasContext.save();
    canvasContext.translate(-camPanX,-camPanY);
	drawWorld();
    p1.draw();
    for (var i=0; i<enemies.length;i++) {
       enemies[i].draw(); 
    }
    /// spriteSheet,cropY,spriteW,spriteH,spriteX,spriteY,spriteW,spriteH
    if (hit == true) {
        drawExplosions(explosionPic,0,50,50,lastShotX,lastShotY,50,50); 
    }
    canvasContext.restore();
}