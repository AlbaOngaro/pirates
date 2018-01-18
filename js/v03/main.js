var canvas, canvasContext;

var redShip = new shipClass();

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
	redShip.reset(shipPic,"Ruby");
}

function updateAll() {
	moveAll();
	drawAll();
}

function moveAll() {
	redShip.move();
    sliderMove();
    cameraFollow();
}

function clearScreen() {
    colorRect(0,0, canvas.width,canvas.height, 'black');
}

function drawAll() {
	clearScreen();
    canvasContext.save();
    canvasContext.translate(-camPanX,-camPanY);
	drawWorld();
    redShip.draw();
    canvasContext.restore();
}