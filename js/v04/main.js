var canvas, canvasContext;

var p1 = new shipClass();
var enemy = new shipClass();

window.onload = function() {
	canvas = document.getElementById('gameCanvas');
	canvasContext = canvas.getContext('2d');
    
    colorRect(0,0,canvas.width,canvas.height,'black');
    colorText('LOADING',canvas.width/2,canvas.height/2,'white');
    
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
    enemy.reset(greenShipPic,"Emerald",false);
    p1.myShot.reset();
    enemy.enemyShot.reset();
}

function updateAll() {
	moveAll();
	drawAll();
    if (enemy.attack) {
        enemy.enemyShot.shotSide = "front";
        enemy.cannonFire();
    }
}

function moveAll() {
	p1.move();
    /// p1 is the target element, which makes the enemy move against it
    enemy.move(p1);
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
    enemy.draw();
    /// spriteSheet,cropX,cropY,spriteW,spriteH,spriteX,spriteY,spriteW,spriteH
    drawAnimatedSpriteSheet(explosionPic,0,0,50,canvas.width/2,canvas.height/2,50,50);
    canvasContext.restore();
}